import { ExchangesApi, GetExchangesFilter } from '@tbdex/http-server';
import { Exchange } from '@tbdex/protocol';
import { Message, Rfq, Quote, Order, OrderStatus, Close } from '@tbdex/protocol';
/**
 * An in-memory implementation of {@link ExchangesApi} for example and default purposes.
 * InMemoryExchangesApi has additional methods {@link InMemoryExchangesApi.addMessage}
 * and {@link InMemoryExchangesApi.clearMessages}
 */
export declare class InMemoryExchangesApi implements ExchangesApi {
    /** Map from exchange_id to Exchange */
    exchangeMessagesMap: Map<string, Exchange>;
    constructor();
    getExchanges(opts?: {
        filter: GetExchangesFilter;
    }): Promise<Exchange[]>;
    getExchange(opts: {
        id: string;
    }): Promise<Exchange | undefined>;
    getRfq(opts: {
        exchangeId: string;
    }): Promise<Rfq | undefined>;
    getQuote(opts: {
        exchangeId: string;
    }): Promise<Quote | undefined>;
    getOrder(opts: {
        exchangeId: string;
    }): Promise<Order | undefined>;
    getOrderStatuses(opts: {
        exchangeId: string;
    }): Promise<OrderStatus[]>;
    getClose(opts: {
        exchangeId: string;
    }): Promise<Close | undefined>;
    addMessage(message: Message): void;
    clearMessages(): void;
}
