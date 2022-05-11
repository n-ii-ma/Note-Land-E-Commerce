const Header = () => {
  return (
    <section className="top-banner">
      <img
        src="https://res.cloudinary.com/de3kst1ud/image/upload/v1652022389/Header/header_portrait_hmsq4f.jpg"
        alt="Samsung Galaxy Note 20 Ultra"
        className="portrait"
      />
      <img
        src="https://res.cloudinary.com/de3kst1ud/image/upload/v1652248828/Header/header_landscape_lwzaaj.jpg"
        alt="Samsung Galaxy Note 20 Ultra"
        className="landscape"
      />
      <article>
        <h1>A Galaxy in the Palm of Your Hand</h1>
        <p className="text-portrait">
          Buy Your Favorite Samsung Galaxy Note on Note Land
        </p>
      </article>
      <p className="text-landscape">
        Buy Your Favorite Samsung Galaxy Note on Note Land
      </p>
    </section>
  );
};

export default Header;
