// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT


    export interface CoinPrice {
        usd: number;
        usd_24h_change: number;
    }

    export interface Price {
        strong: CoinPrice;
    }

    export interface CoinGeckoPrice {
        success: boolean;
        message: string;
        code: number;
        data: Price;
    }
