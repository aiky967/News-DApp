import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useNavigate } from "react-router-dom"
import Web3 from 'web3'

import {
  marketplaceAddress
} from '../config'


import NewsFeed from '../artifacts/contracts/NewsFeed.sol/NewsFeed.json'

export default function MyArticles() {
    const [nfts, setNfts] = useState([])
  const [newsArt, setnewsArt] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [balanceval, setBalance] = useState([])
  // let navigate = useNavigate();
  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const apiKey = process.env.alchemyApiKey;
    const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;
    const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
    const contract = new ethers.Contract(marketplaceAddress, NewsFeed.abi, provider)
    const data = await contract.fetchNewsFeeds()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        author: i.author,
        owner: i.owner,
        article: i.article,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  useEffect(() => {
    loadBalance()
  }, [])

  async function loadBalance(){
    console.log('start') 
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const web3 = new Web3()

    let contract = new ethers.Contract(marketplaceAddress, NewsFeed.abi, signer)
    let balanceval = await contract.balance()
    console.log(balanceval)
    // balanceval = ethers.utils.formatUnits(web3.utils.toBN(balanceval).toString(), 'eth')
    balanceval = web3.utils.fromWei(balanceval.toString(), 'ether')
    setBalance(balanceval)
    setLoadingState('loaded') 
    console.log(balanceval)
  }

  const DisplayArticle = () =>{
    
    return (
  <div  style={{ maxWidth: '1600px' }}>
{
          nfts.map((nft, i) => (
// eslint-disable-next-line react/jsx-key
<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
  <div className="rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{nft.name}</div>
      <p className="text-gray-700 text-base">{nft.description}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
    
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div>
  </div>
  ))
   }      
</div>
);
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">You have not posted any articles.</h1>)
  return (
  <div className="flex justify-center">
   <div className="flex justify-center">
  <DisplayArticle/>
  </div>
  <div className="flex justify-center" style={{height:"10%", position:"absolute", bottom:"20px"}}>
 
  <div className="rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{newsArt.name}</div>
        <p className="text-gray-700 text-base">{newsArt.description}</p>
        <p className="text-gray-700 text-base">{newsArt.article}
        </p>
      </div>
    </div>
  </div>
</div>
    )
}