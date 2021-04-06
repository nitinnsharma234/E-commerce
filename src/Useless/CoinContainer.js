import React, { Component } from "react";
import Coin from "./Coin";
import { choice } from "./helpers";

class CoinContainer extends Component {
    static defaultProps = {
        coins: [
            { side: "heads", imgSrc: "https://tinyurl.com/react-coin-heads-jpg" },
            { side: "tails", imgSrc: "https://tinyurl.com/react-coin-tails-jpg" }
        ]
    };
    constructor(props) {
        super(props);
        this.state = {
            currCoin: null,
            nFlips: 0,
            nHeads: 0,
            nTails: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    st(st1) {
        const newCoin = choice(this.props.coins);
        return {
            currCoin: newCoin,
            nFlips: st1.nFlips + 1,
            nHeads: st1.nHeads + (newCoin.side === "heads" ? 1 : 0),
            nTails: st1.nTails + (newCoin.side === "tails" ? 1 : 0)
        };

    }
    flipCoin() {

        this.setState(this.st);
    }
    handleClick(e) {
        this.flipCoin();
    }
    render() {
        const ap = <p>
            Out of {this.state.nFlips} flips, there have been {this.state.nHeads}{" "}
heads and {this.state.nTails} tails.
</p>
        return (
            <div className='CoinContainer'>
                <h2>Let's Flip A Coin!</h2>
                {this.state.currCoin && <Coin info={this.state.currCoin} />}
                <button onClick={this.handleClick}>Flip Me!</button>
                {ap}
            </div>
        );
    }
}

export default CoinContainer;
