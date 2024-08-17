import React from 'react';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';

const Playlist = () => {
     const tracks = [
          { id: 1, title: 'Guilt', artist: 'Nero', album: 'Welcome Reality', time: '4:44' },
          { id: 2, title: 'Elektro', artist: 'Dynoro, Outwork, Mr. Gee', album: 'Elektro', time: '2:22' },
          { id: 3, title: "I'm Fire", artist: 'Ali Bakgor', album: "I'm Fire", time: '2:22' },
          { id: 4, title: 'Non Stop', artist: 'Стоункат, Psychopath', album: 'Non Stop', time: '4:12' },
          { id: 5, title: 'Run Run', artist: 'Jaded, Will Clarke, AR/CO', album: 'Run Run', time: '2:54' },
          { id: 6, title: 'Eyes on Fire', artist: 'Blue Foundation, Zeds Dead', album: 'Eyes on Fire', time: '5:20' },
          { id: 7, title: 'Mucho Bien', artist: 'HYBIT, Mr. Black, Offer Nissim, Hi Profile', album: 'Mucho Bien', time: '3:41' },
          { id: 8, title: 'Knives n Cherries', artist: 'minthaze', album: 'Captivating', time: '1:48' },
          { id: 9, title: 'How Deep Is Your Love', artist: 'Calvin Harris, Disciples', album: 'How Deep Is Your Love', time: '3:32' },
          { id: 10, title: 'Morena', artist: 'Tom Boxer', album: 'Soundz Made in Romania', time: '3:36' },
          { id: 11, title: 'Ты та...', artist: 'Баста', album: 'Баста 1', time: '4:04' },
          { id: 12, title: 'Siren Song', artist: 'Maruv', album: 'Hellcat Story', time: '3:37' },
          { id: 13, title: 'Shameless', artist: 'Camila Cabello', album: 'Romance', time: '3:39' },
          { id: 14, title: 'Crazy', artist: 'Gnarls Barkley', album: 'St. Elsewhere', time: '2:58' },
          { id: 15, title: "Knockin' on Heaven's Door", artist: "Guns N' Roses", album: 'Use Your Illusion II', time: '5:36' }
     ];

     return (
          <div className={styles.playlist}>
               {tracks.map((track) => (
                    <Track key={track.id} {...track} />
               ))}
          </div>
     );
};

export default Playlist;