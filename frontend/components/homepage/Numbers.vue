<template>
	<section class="w-full max-w-4xl mx-auto mt-20 px-2">
		<div class="flex flex-col md:flex-row md:justify-between gap-8">
			<!-- Statystyki (bez zmian) -->
			<div
				class="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl px-8 flex gap-8 justify-center items-center transition-all">
				<div class="flex flex-col items-center">
					<span
						class="px-4 py-2 rounded-xl bg-black border border-white/30 text-2xl font-extrabold text-emerald-400 drop-shadow flex items-center min-w-[62px] h-[62px] justify-center">
						24
					</span>
					<span class="text-xs text-white/70 uppercase tracking-wider mt-3">Airdrops</span>
				</div>
				<div class="flex flex-col items-center">
					<span
						class="px-4 py-2 rounded-xl bg-black border border-white/30 text-2xl font-extrabold text-fuchsia-400 drop-shadow flex items-center min-w-[62px] h-[62px] justify-center">
						12
					</span>
					<span class="text-xs text-white/70 uppercase tracking-wider mt-3">Tutorials</span>
				</div>
				<div class="flex flex-col items-center">
					<span
						class="px-4 py-2 rounded-xl bg-black border border-white/30 text-2xl font-extrabold text-blue-400 drop-shadow flex items-center min-w-[62px] h-[62px] justify-center">
						4K
					</span>
					<span class="text-xs text-white/70 uppercase tracking-wider mt-3">Users</span>
				</div>
			</div>
			<!-- Community - lekko, z podziałem, dodatkami -->
			<div
				class="flex-1 bg-gradient-to-tr from-[#191631]/90 via-indigo-900/70 to-fuchsia-900/40 rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
				<!-- subtelny badge pod tytułem -->
				<div class="flex flex-col items-center w-full z-10">
					<span class="text-base font-bold tracking-wide text-white/90 mb-2"> Join the community</span>
					<!-- <span
						class="text-xs uppercase tracking-wide bg-black/70 border border-white/10 text-white/80 rounded-full px-3 py-1 mb-3 shadow"
						>community</span
					> -->
					<div class="mb-5 text-sm text-white/70 text-center max-w-xs">
						Stay up to date with the best airdrops – join our channels!
					</div>
				</div>
				<!-- przyciski w 2 rzędach na mobile, 1 na desktop -->
				<div class="flex flex-col sm:flex-row gap-3 w-full justify-center z-10">
					<a
						href="https://discord.gg/..."
						target="_blank"
						class="w-full sm:w-auto px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold text-sm shadow border border-indigo-300/10 text-center">
						Discord
					</a>
					<a
						href="https://t.me/..."
						target="_blank"
						class="w-full sm:w-auto px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 transition text-white font-semibold text-sm shadow border border-blue-300/10 text-center">
						Telegram
					</a>
					<a
						href="https://twitter.com/..."
						target="_blank"
						class="w-full sm:w-auto px-4 py-2 rounded-full bg-black hover:bg-gray-900 transition text-white font-semibold text-sm shadow border border-white/10 text-center">
						X (Twitter)
					</a>
				</div>
				<!-- Lekki blur pod spodem -->
				<div class="absolute inset-0 pointer-events-none z-0">
					<div
						class="w-36 h-20 bg-gradient-to-tr from-fuchsia-600/30 via-indigo-400/20 to-white/5 blur-2xl rounded-full mx-auto mt-8"></div>
				</div>
			</div>
		</div>
	</section>
</template>
