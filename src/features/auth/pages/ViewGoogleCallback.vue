<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Processing Google Sign-In...</h1>
      <p>Please wait while we securely log you in.</p>
      <!-- You can add a spinner or loading animation here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const storedCodeVerifier = sessionStorage.getItem('google_code_verifier');
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  if (code && storedCodeVerifier) {
    try {
      const backendExchangeUri = import.meta.env.VITE_BACKEND_GOOGLE_AUTH_EXCHANGE_URI;
      const response = await fetch(backendExchangeUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          codeVerifier: storedCodeVerifier,
          redirectUri: redirectUri,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a JWT in a 'token' field
        const jwt = data.token;

        if (jwt) {
          // Store the JWT (e.g., in localStorage or a Pinia store)
          localStorage.setItem('jwt_token', jwt);
          // Clear the code verifier from session storage
          sessionStorage.removeItem('google_code_verifier');
          // Redirect to dashboard or home page
          router.push('/dashboard');
        } else {
          console.error('JWT not found in backend response');
          // Handle error: redirect to sign-in with an error message
          router.push('/auth/sign-in?error=jwt_missing');
        }
      } else {
        const errorData = await response.json();
        console.error('Backend exchange failed:', errorData);
        // Handle error: redirect to sign-in with an error message
        router.push('/auth/sign-in?error=backend_exchange_failed');
      }
    } catch (error) {
      console.error('Error during Google code exchange:', error);
      // Handle network or other errors
      router.push('/auth/sign-in?error=network_error');
    }
  } else {
    console.error('Missing code or code verifier in URL/session storage');
    // Handle case where no code or verifier is present (e.g., user denied access or session expired)
    router.push('/auth/sign-in?error=missing_code_or_verifier');
  }
});
</script>

<style scoped>
/* Add any specific styles for this component if needed */
</style>
