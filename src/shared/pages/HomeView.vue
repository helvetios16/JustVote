<template>
  <body
    class="bg-bg-main text-text-main min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
  >
    <div
      class="subtle-glow w-[400px] h-[400px] bg-purple-600 top-[-100px] left-[-100px] animate-pulse"
    ></div>
    <div
      class="subtle-glow w-[300px] h-[300px] bg-indigo-600 bottom-[-80px] right-[-80px] animate-pulse animation-delay-2000"
    ></div>
    <div
      class="subtle-glow w-[250px] h-[250px] bg-pink-500 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-pulse animation-delay-4000 opacity-20"
    ></div>
    <main class="z-10 text-center p-8">
      <h1 class="text-5xl font-bold tracking-wider">YOU'RE NOT FUTURE</h1>
      <h4 class="text-2xl font-bold mb-8 tracking-wider">
        <span class="bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
          #JustVote
        </span>
      </h4>

      <RouterLink
        to="/auth/sign-in"
        class="gradient-bg text-text-main font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-lg hover:opacity-90"
      >
        ENTER
      </RouterLink>
    </main>
    <footer class="absolute bottom-4 left-4 text-sm text-text-secondary">
      <span class="bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
        JustVote
      </span>
    </footer>
  </body>
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(to right, #4f46e5, #d946ef);
}
.subtle-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}
</style>
