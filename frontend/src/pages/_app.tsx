import '../styles/globals.css';
import { createConfig, WagmiProvider, http } from 'wagmi';
import type { AppProps } from 'next/app';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
