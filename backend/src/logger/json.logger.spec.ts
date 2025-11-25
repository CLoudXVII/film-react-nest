import { JsonLogger } from "./json.logger";

describe("JsonLogger", () => {
    let logger: JsonLogger;

    const mockConsole = () => {
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    };

    const expected = (obj: any) => JSON.stringify(obj);

    beforeEach(() => {
        logger = new JsonLogger();
        mockConsole();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("log() outputs JSON", () => {
        logger.log("test log msg", "optional msg");

        expect(console.log).toHaveBeenCalledWith(
            expected({
                level: "log",
                message: "test log msg",
                optionalParams: [["optional msg"]],
            })
        );
    });

    it("warn() outputs JSON", () => {
        logger.warn("test warn msg", "optional msg");

        expect(console.warn).toHaveBeenCalledWith(
            expected({
                level: "warn",
                message: "test warn msg",
                optionalParams: ["optional msg"],
            })
        );
    });

    it("error() outputs JSON", () => {
        logger.error("test error msg", "optional msg");

        expect(console.error).toHaveBeenCalledWith(
            expected({
                level: "error",
                message: "test error msg",
                optionalParams: ["optional msg"],
            })
        );
    });
});
