import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button, Row, Col, Typography, Card } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const { Title, Paragraph } = Typography;

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected) {
      router.push('/profile');
    }
  }, [mounted, isConnected, router]);

  if (!mounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Title className={styles.title}>Welcome to FitMiles</Title>
      <Paragraph className={styles.description}>
        FitMiles is a revolutionary app that rewards you with tokens based on your running distance.
        Track your progress, earn rewards, and stay motivated!
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            hoverable
            cover={<Image alt="feature1" src="/feature1.png" width={400} height={300} />}
          >
            <Card.Meta title="Track Your Runs" description="Monitor your running distance and performance over time." />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<Image alt="feature2" src="/feature2.png" width={400} height={300} />}
          >
            <Card.Meta title="Earn Rewards" description="Earn tokens based on your running distance and achievements." />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={<Image alt="feature3" src="/feature3.png" width={400} height={300} />}
          >
            <Card.Meta title="Stay Motivated" description="Join challenges and compete with friends to stay motivated." />
          </Card>
        </Col>
      </Row>

      <Row className={styles.connectSection}>
        <Col span={24} className={styles.card}>
          {isConnected ? (
            <>
              <p>Connected to {address}</p>
              <Button
                type="primary"
                onClick={() => disconnect()}
                className={styles.button}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <>
              {connectors.map((connector) => (
                <Button
                  key={connector.id}
                  type="primary"
                  onClick={() => connect({ connector })}
                  className={styles.button}
                >
                  Connect with {connector.name}
                  {isPending && ' (connecting)'}
                </Button>
              ))}
              {error && <div>{error.message}</div>}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
