import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from 'antd'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>Connected to {address}</p>
        <Button type="primary" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          type="primary"
          onClick={() => connect({ connector })}
          disabled={!connector.ready}
        >
          Connect with {connector.name}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
