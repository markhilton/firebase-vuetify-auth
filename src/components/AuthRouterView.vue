<template>
  <router-view v-slot="{ Component: RouteComponent, route }">
    <component :is="getComponentToRender(RouteComponent, route)" />
  </router-view>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Props to allow customization
interface Props {
  fallbackRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallbackRoute: '/'
})

// Cache for the fallback component
let fallbackComponent: Component | null = null

// Function to get the component from a route path
const getComponentFromRoute = async (path: string): Promise<Component | null> => {
  try {
    // Find the route configuration for the fallback path
    const route = router.resolve(path)
    
    if (route && route.matched.length > 0) {
      // Get the component from the last matched route record
      const routeRecord = route.matched[route.matched.length - 1]
      
      if (routeRecord.components?.default) {
        // If it's a lazy-loaded component, it will be a function
        if (typeof routeRecord.components.default === 'function') {
          const module = await (routeRecord.components.default as any)()
          return module.default || module
        }
        // If it's already a component
        return routeRecord.components.default as Component
      }
    }
  } catch (error) {
    console.error(`[AuthRouterView] Error loading fallback component from route ${path}:`, error)
  }
  
  return null
}

// Function to check if a route is protected
const isRouteProtected = (path: string): boolean => {
  try {
    const route = router.resolve(path)
    return route.matched.some((record) => record.meta.requiresAuth === true)
  } catch {
    return false
  }
}

// Function to determine which component to render
const getComponentToRender = (originalComponent: Component | undefined, currentRoute: RouteLocationNormalizedLoaded): Component | undefined => {
  // If no component, return undefined
  if (!originalComponent) return undefined
  
  // Check if current route requires authentication
  const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
  
  // If route doesn't require auth, show the original component
  if (!requiresAuth) {
    return originalComponent
  }
  
  // If route requires auth and user is authenticated, show the original component
  if (authStore.isAuthenticated) {
    return originalComponent
  }
  
  // If route requires auth but user is NOT authenticated
  // Check if the fallback route is also protected
  if (props.fallbackRoute && isRouteProtected(props.fallbackRoute)) {
    if (authStore.config?.debug) {
      console.log(`[AuthRouterView] Fallback route ${props.fallbackRoute} is also protected, hiding content`)
    }
    // Return empty component since fallback is also protected
    return {
      name: 'AuthRouterViewEmpty',
      template: '<div></div>'
    } as Component
  }
  
  // If fallback route is not protected, show it
  if (authStore.config?.debug) {
    console.log(`[AuthRouterView] Showing fallback content for protected route: ${currentRoute.path}`)
  }
  
  // If we don't have the fallback component cached, create it
  if (!fallbackComponent && props.fallbackRoute) {
    // Create a wrapper component that loads the fallback route's component
    fallbackComponent = defineAsyncComponent(async () => {
      const component = await getComponentFromRoute(props.fallbackRoute)
      if (component) {
        return component
      }
      
      // If we couldn't load the component, return a simple placeholder
      return {
        name: 'AuthRouterViewFallback',
        template: '<div></div>'
      }
    })
  }
  
  return fallbackComponent || originalComponent
}
</script>