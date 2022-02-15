import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

export const SendLamport: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();


    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey("EucPLGG4y8MxTDHTvPwDrDzg5dukdRYd8ZKxbZv6vdwf"),
                lamports: 1,
            })
        );


        const signature = await sendTransaction(transaction, connection);

        console.log(signature)

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};