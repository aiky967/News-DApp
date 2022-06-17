/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import Router from 'next/router';

const cors = require('cors');

const corsOptions ={
  origin: 'http:/localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">News Headlines</p>
        <div className="flex mt-4">

          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>

          <Link href="/create-newsfeed">
            <a className="mr-6 text-pink-500">
              Create Article
            </a>
          </Link>

          <Link href="/my-articles">
            <a className="mr-6 text-pink-500">
              My Articles
            </a>
          </Link>

          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">
              Dashboard
            </a>
          </Link>
          
          {/* <Link href="/alchemy-nft">
            <a className="mr-6 text-pink-500">
              Alchemy -Articles
            </a>
          </Link> */}

          <Link href="/video-upload">
            <a className="mr-6 text-pink-500">
              Upload Ads
            </a>
          </Link>

          <Link href="/video-view">
            <a className="mr-6 text-pink-500">
              View Ads
            </a>
          </Link>
          
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
};

// MyApp.use(cors(corsOptions));

// Router.get("/video-view", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
// });

export default MyApp;