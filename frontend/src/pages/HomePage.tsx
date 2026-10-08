// frontend/src/pages/HomePage.tsx

import { API_URL } from '../config';


interface Props {
  onLogout: () => void;
}


export default function HomePage({
  onLogout
}: Props) {


  async function handleLogout() {

    const sessionId =
      localStorage.getItem('sessionId');

    try {

      if (sessionId) {

        await fetch(
          `${API_URL}/api/logout`,
          {
            method: 'POST',

            headers: {
              Authorization: `Bearer ${sessionId}`
            }
          }
        );
      }

    }
    catch (err) {

      console.error(
        'Logout fout:',
        err
      );

    }
    finally {

      // Lokale sessie altijd verwijderen.
      localStorage.removeItem(
        'sessionId'
      );

      onLogout();
    }
  }


  return (
    <div>

      <div>
        Ingelogd
      </div>

      <button
        type="button"
        onClick={handleLogout}
      >
        Uitloggen
      </button>

    </div>
  );
}