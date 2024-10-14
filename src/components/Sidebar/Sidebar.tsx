import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/authSlice';
import { clearFavoriteTracks } from '@/store/features/audioPlayerSlice';
import { getAllSelections } from '@/api/api';

interface Selection {
  _id: number;
  name: string;
}

const Sidebar = () => {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = useSelector((state: RootState) => state.auth.username);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSelections = async () => {
      setIsLoading(true);
      try {
        const data = await getAllSelections();
        if (Array.isArray(data.data)) {
          setSelections(data.data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching selections:', error);
        setError('Не удалось загрузить подборки');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSelections();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavoriteTracks());
    router.push('/signin');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>{username || 'Гость'}</p>
        <div className={styles.icon} onClick={handleLogout}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.list}>
          {isLoading ? (
            <p>Загрузка подборок...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            selections.map((selection) => (
              <div key={selection._id} className={styles.item}>
                <Link href={`/playlist/${selection._id}`} className={styles.link}>
                  <Image
                    className={styles.img}
                    src={`/img/playlist0${selection._id}.png`}
                    alt={selection.name}
                    width={250}
                    height={150}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;