import React, { useState, useEffect } from 'react';
import './App.css';

interface DropData {
  [key: string]: {
    node_running_coins: string;
    ambassador_coins: string;
    quest_coins: string;
    wants_initial_rolls?: boolean;
  };
}

const App = () => {
  const [nodeRunningCoins, setNodeRunningCoins] = useState("");
  const [ambassadorCoins, setAmbassadorCoins] = useState("");
  const [questCoins, setQuestCoins] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [drop, setDrop] = useState<DropData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Massa-Foundation/genesis-ledger/main/input_listings/dashboard_data.json');
        const data: DropData = await response.json();
        setDrop(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    if (drop.hasOwnProperty(address)) {
      const data = drop[address];
      setNodeRunningCoins(data.node_running_coins);
      setAmbassadorCoins(data.ambassador_coins);
      setQuestCoins(data.quest_coins);
      setErrorMessage("");
    } else {
      setNodeRunningCoins("");
      setAmbassadorCoins("");
      setQuestCoins("");
      setErrorMessage("Sorry, you are not eligible");
    }
  };

  const totalNodeRunningCoins = Object.values(drop).reduce(
    (total, data) => total + parseFloat(data.node_running_coins),
    0
  );

  const totalAmbassadorCoins = Object.values(drop).reduce(
    (total, data) => total + parseFloat(data.ambassador_coins),
    0
  );

  const totalQuestCoins = Object.values(drop).reduce(
    (total, data) => total + parseFloat(data.quest_coins),
    0
  );

  const totalEligibleAddresses = Object.keys(drop).filter(address => address.startsWith("AU1")).length;

  const totalAllTokens = Object.values(drop).reduce(
    (total, data) =>
      total +
      parseFloat(data.node_running_coins) +
      parseFloat(data.ambassador_coins) +
      parseFloat(data.quest_coins),
    0
  );

  const totalCoins = parseFloat(nodeRunningCoins) + parseFloat(ambassadorCoins) + parseFloat(questCoins);
  return (
    <div className="App">
<h1 className="title fancy-title">How much $MASS do you get?</h1>

      <a href="https://massa.net/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://pbs.twimg.com/profile_images/1580151744901824512/W_MD85bU_400x400.jpg"
          className="logo react"
          alt="Rave logo"
        />
      </a>

      <p><strong>INFORMATION</strong></p>
      <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Total Tokens</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Total Addres Eligble :</td>
                 
                <td>{totalEligibleAddresses.toLocaleString()} ({(totalEligibleAddresses / 1000).toFixed(1)}K)</td>
                    </tr>
              <tr>
                <td>Total Reward Node :</td>
                 
                <td> {totalNodeRunningCoins.toLocaleString()} ({(totalNodeRunningCoins/1000000).toFixed(1)}M) </td>            
                    </tr>
             
              <tr>
                <td>Total Reward Quest:</td>
                <td> {totalQuestCoins.toLocaleString()} ({(totalQuestCoins/1000000).toFixed(1)}M) </td>

             
              </tr>
               <tr>
                <td>Total Reward Ambassador:</td>
                <td> {totalAmbassadorCoins.toLocaleString()} ({(totalAmbassadorCoins/1000000).toFixed(1)}M) </td>
          
              </tr>
              <tr>
                <td>Total Airdrop:</td>
                <td> {totalAllTokens.toLocaleString()} ({(totalAllTokens/1000000).toFixed(1)}M) </td>

             
              </tr>
            </tbody>
          </table>
      
  <div className="input-container">
    <input type="text" placeholder="Enter address" onChange={handleInputChange}  />
  
</div>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : nodeRunningCoins ? (
        <div className="coins-container">
          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Node Running Coins:</td>
                <td>{nodeRunningCoins}</td>
              </tr>
              <tr>
                <td>Ambassador Coins:</td>
                <td>{ambassadorCoins}</td>
              </tr>
              <tr>
                <td>Quest Coins:</td>
                <td>{questCoins}</td>
              </tr>
              <tr>
              <td className="total-coins" colSpan={2}>
              <div className="centered-text">
              <span className="total-reward-label">Total Reward: {totalCoins}$MASS</span></div>
              <div className="centered-text">
<span className="total-vesting-label">Total Unlocked: {totalCoins * 0.3}$MASS</span>
</div>
</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

<p className="subtitle" style={{ color: 'white' }}>MADE BY SIPALING TESTNET</p>
    </div>
  );
}

export default App;