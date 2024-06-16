import { Exchange } from '@tbdex/protocol';
/**
 * An in-memory implementation of {@link ExchangesApi} for example and default purposes.
 * InMemoryExchangesApi has additional methods {@link InMemoryExchangesApi.addMessage}
 * and {@link InMemoryExchangesApi.clearMessages}
 */
export class InMemoryExchangesApi {
    /** Map from exchange_id to Exchange */
    exchangeMessagesMap;
    constructor() {
        this.exchangeMessagesMap = new Map();
    }
    async getExchanges(opts) {
        console.log('exchanges');
        if (opts === undefined || opts.filter === undefined) {
            // In production, this should probably return an empty list.
            // For example and testing purposes, we return all exchanges.
            return Array.from(this.exchangeMessagesMap.values());
        }
        const exchanges = [];
        if (opts.filter.id) {
            // filter has `id` and `from`
            for (const id of opts.filter.id) {
                const exchange = this.exchangeMessagesMap.get(id);
                if (exchange?.rfq?.from === opts.filter.from) {
                    exchanges.push(exchange);
                }
            }
        }
        else {
            // filter only has `from`
            this.exchangeMessagesMap.forEach((exchange, _id) => {
                // You definitely shouldn't use InMemoryExchangesApi in production.
                // This will get really slow
                if (exchange?.rfq?.from === opts.filter.from) {
                    exchanges.push(exchange);
                }
            });
        }
        return exchanges;
    }
    async getExchange(opts) {
        console.log('get exchange', opts.id);
        const exchange = this.exchangeMessagesMap.get(opts.id);
        console.log('exchange', exchange);
        return Promise.resolve(exchange);
    }
    async getRfq(opts) {
        const exchange = this.exchangeMessagesMap.get(opts.exchangeId);
        return exchange?.rfq;
    }
    async getQuote(opts) {
        const exchange = this.exchangeMessagesMap.get(opts.exchangeId);
        return Promise.resolve(exchange?.quote);
    }
    async getOrder(opts) {
        const exchange = this.exchangeMessagesMap.get(opts.exchangeId);
        return exchange?.order;
    }
    async getOrderStatuses(opts) {
        const exchange = this.exchangeMessagesMap.get(opts.exchangeId);
        return exchange?.orderstatus ?? [];
    }
    async getClose(opts) {
        const exchange = this.exchangeMessagesMap.get(opts.exchangeId);
        return exchange?.close;
    }
    addMessage(message) {
        const exchange = this.exchangeMessagesMap.get(message.exchangeId) ?? new Exchange();
        exchange.addNextMessage(message);
        this.exchangeMessagesMap.set(message.exchangeId, exchange);
    }
    clearMessages() {
        this.exchangeMessagesMap = new Map();
    }
}
//# sourceMappingURL=exchanges.js.map