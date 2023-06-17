// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
// import { getGames } from '../api/gameData';
// import { useAuth } from '../utils/context/authContext';
// import GameCard from '../components/GameCard';

// function Home() {
//   const [games, setGames] = useState([]);

//   const { user } = useAuth();

//   const getAllTheGames = () => {
//     getGames(user.uid).then(setGames);
//   };

//   useEffect(() => {
//     getAllTheGames();
//   }, []);

//   return (
//     <div className="text-center my-4">
//       <Link href="/Game/newGame" passHref>
//         <Button variant="dark">Add A Game</Button>
//       </Link>
//       <div className="d-flex flex-wrap">
//         {games.map((game) => (
//           <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllTheGames} />
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import GameCard from '../components/GameCard';
import { getGames } from '../api/gameData';

const MyComponent = () => {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { query } = router;

  const getAllTheGames = () => {
    getGames().then((data) => {
      setGames(data);
    });
  };

  useEffect(() => {
    getAllTheGames();
  }, [query.type]);

  const styles = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show in a row
    slidesToScroll: 1,
  };

  return (
    <Slider {...styles}>
      {games.map((game) => (
        <div key={game.firebaseKey}>
          <Card>
            <GameCard gameObj={game} onUpdate={getGames} />
          </Card>
        </div>
      ))}
    </Slider>
  );
};

export default MyComponent;
