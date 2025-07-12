<template>
  <div class="form-container p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md text-text-main">
    <button
      @click="signInWithGoogle"
      class="w-full button-gradient-logo text-text-main font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
      type="button"
    >
      <img alt="Google logo" class="w-5 h-5 mr-3" :src="logoGoogle" />

      Sign in with Google
    </button>

    <!-- GitHub -->
    <!-- <button -->
    <!--   class="mt-4 w-full button-gradient-logo text-text-main font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500" -->
    <!--   type="button" -->
    <!-- > -->
    <!--   <img alt="GitHub logo" class="w-5 h-5 mr-3" :src="logoGithub" /> -->
    <!--   Sign in with GitHub -->
    <!-- </button> -->

    <!-- Microsoft -->
    <!-- <button -->
    <!--   class="mt-4 w-full button-gradient-logo text-text-main font-medium py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500" -->
    <!--   type="button" -->
    <!-- > -->
    <!--   <img alt="Microsoft logo" class="w-5 h-5 mr-3" :src="logoMicrosoft" /> -->
    <!--   Sign in with Microsoft -->
    <!-- </button> -->
  </div>
</template>

<script setup lang="ts">
import logoGoogle from '@/shared/assets/icon/logo_google.svg';
// import logoGithub from '@/shared/assets/icon/logo_github.svg';
// import logoMicrosoft from '@/shared/assets/icon/logo_microsoft.svg';

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64urlencode = (a: ArrayBuffer): string => {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const signInWithGoogle = async () => {
  const codeVerifier = generateRandomString(128);
  sessionStorage.setItem('google_code_verifier', codeVerifier);

  // Although Google doesn't require code_challenge for response_type=code,
  // we generate it for consistency if the backend expects it for PKCE validation.
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const scope = 'openid profile email';
  const responseType = 'code';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  window.location.href = authUrl;
};
</script>

<style scoped>
.form-container {
  background-color: var(--form-bg);
  backdrop-filter: blur(10px);
}

.button-gradient-logo {
  background: linear-gradient(to right, #4f46e5, #d946ef);
}
</style>
