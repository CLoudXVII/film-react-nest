import { DevLogger } from "./dev.logger";

describe("DevLogger", () => {
    let logger: DevLogger;

    const mockStdout = () => jest.spyOn(process.stdout, "write").mockReturnValue(true as any);
    const mockStderr = () => jest.spyOn(process.stderr, "write").mockReturnValue(true as any);

    const assertCalls = (spy: jest.SpyInstance, level: string) => {
        expect(spy).toHaveBeenCalledWith(expect.stringContaining(level));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("test msg"));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("optional msg"));
    };

    beforeEach(() => {
        logger = new DevLogger();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("log() writes to stdout", () => {
        const spy = mockStdout();

        logger.log("test msg", "optional msg");

        assertCalls(spy, "LOG");
    });

    it("warn() writes to stdout", () => {
        const spy = mockStdout();

        logger.warn("test msg", "optional msg");

        assertCalls(spy, "WARN");
    });

    it("error() writes to stderr", () => {
        const spy = mockStderr();

        logger.error("test msg", "optional msg");

        assertCalls(spy, "ERROR");
    });
});
