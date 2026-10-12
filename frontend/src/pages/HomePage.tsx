// frontend/src/pages/HomePage.tsx

import { API_URL } from '../config';
import { useState } from 'react';
import MessagePopup from '../popup/MessagePopup';

interface Props {
  onLogout: () => void;
}

export default function HomePage({ onLogout }: Props) {

  const [showMessage, setShowMessage] = useState(false);

  async function handleLogout() {

    const sessionId = localStorage.getItem('sessionId');

    try {
      if (sessionId) {
        await fetch(`${API_URL}/api/logout`, { method: 'POST', headers: { Authorization: `Bearer ${sessionId}` } });
      }
    }
    catch (err) {
      console.error('Logout fout:', err);
    }
    finally {
      // Lokale sessie altijd verwijderen.
      localStorage.removeItem('sessionId');

      onLogout();
    }
  }

  return (
    <div>

      <div>
        Ingelogd
      </div>

      <button type="button" onClick={() => setShowMessage(true)} >
        Uitloggen
      </button>

      {showMessage && (
        <MessagePopup
          lines={[
            'Je wordt nu afgemeld.',
            'Dit is een test popup voor standaard berichten'
          ]}
          cancelText="Sluiten"
          onCancel={() => {
            setShowMessage(false);
            handleLogout();
          }}
        />
      )}

    </div>
  );
}