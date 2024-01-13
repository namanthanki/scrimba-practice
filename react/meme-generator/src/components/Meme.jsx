import React from "react";

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        const fetchMemes = async () => {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }

        fetchMemes();
    }, []);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        const memeUrl = allMemes[getRandomInt(0, allMemes.length)].url;

        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: memeUrl
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <form className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={handleOnClick}
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
            </form>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme