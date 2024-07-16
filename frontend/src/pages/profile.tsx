import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button, Typography, Row, Col, Card } from 'antd';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';

const { Title, Paragraph } = Typography;

interface User {
  address: string;
  tokensEarned: number;
  runsCompleted: number;
}

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isConnected) {
      router.push('/');
    }
  }, [mounted, isConnected, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (address) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${address}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUser();
  }, [address]);

  if (!mounted) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!isConnected) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        onClick={() => {
          disconnect();
          router.push('/');
        }}
        className={styles.disconnectButton}
      >
        Disconnect
      </Button>

      <Title className={styles.title}>User Profile</Title>
      <Paragraph className={styles.description}>
        Here is your profile information and your recent activities.
      </Paragraph>

      {user && (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Profile Information" className={styles.card}>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Tokens Earned:</strong> {user.tokensEarned}</p>
              <p><strong>Runs Completed:</strong> {user.runsCompleted}</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Recent Activities" className={styles.card}>
              <ul>
                <li>5 km run - 20 tokens earned</li>
                <li>10 km run - 50 tokens earned</li>
                <li>Joined &quot;Summer Challenge&quot;</li>
              </ul>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
