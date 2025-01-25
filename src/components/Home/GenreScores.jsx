import { useEffect, useState, useContext } from "react";
import { AuthedUserContext } from "../../App";
import {genre_scores} from "../../services/profileService";

const GenreScores = () => {
    const [genreScores, setGenreScores] = useState([]);
    const { user } = useContext(AuthedUserContext);
    if (!user) return null;
    useEffect(() => {
        const fetchGenreScores = async () => {
            const data = await genre_scores();
            setGenreScores(data);
        };
        fetchGenreScores();
    }, []);
    if (!genreScores.length)
        return (
          <h1 style={{ textAlign: "center" }}>
            Make sure to add some genreScores!
          </h1>
        );
        return(
            <div>
                <h1>Genre Scores</h1>
                <ul>
                    {genreScores.map((genreScore) => (
                        <li key={genreScore.id}>
                            <span>{genreScore.genre}</span>
                            <span>{genreScore.score}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    export default GenreScores;