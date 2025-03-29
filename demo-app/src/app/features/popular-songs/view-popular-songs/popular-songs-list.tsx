import {fetchPopularSongs} from "./presenter/thunk.ts";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../../../core/store.ts";
import {useDispatch, useSelector} from "react-redux";

export const PopularSongsList = () => {
    const { songs, loading, error } = useSelector((state: RootState) => state.popularSongs)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {dispatch(fetchPopularSongs());}, [])

    return (
        <div>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Error: {error}</p>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
        </div>
    )
};