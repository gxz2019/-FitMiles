import '../styles/globals.css';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { mainnet, sepolia } from 'wagmi/chains';

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </WagmiProvider>
  );
}

export default MyApp;
