import { TskvLogger } from "./tskv.logger";

describe('TSKV Logger', () => {
    let logger: TskvLogger;

    beforeEach(() => {
        logger = new TskvLogger();
        jest.spyOn(console, 'log').mockImplementation(() => { })
        jest.spyOn(console, 'error').mockImplementation(() => { })
        jest.spyOn(console, 'warn').mockImplementation(() => { })
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })

    it('log as TSKV', () => {
        logger.log("test log msg", "optional msg");

        expect(console.log).toHaveBeenCalledWith("level=log\tmessage=test log msg\toptionalParams=optional msg\n")
    })

    it('warn log as TSKV', () => {
        logger.warn("test warn msg", "optional msg");

        expect(console.warn).toHaveBeenCalledWith("level=warn\tmessage=test warn msg\toptionalParams=optional msg\n")
    })

    it('error log as TSKV', () => {
        logger.error("test error msg", "optional msg");

        expect(console.error).toHaveBeenCalledWith("level=error\tmessage=test error msg\toptionalParams=optional msg\n")
    })
})
