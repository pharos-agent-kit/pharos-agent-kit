import { Tool } from "langchain/tools";
import { PharosAgentKit } from "../../agent";
import { create_image } from "../../tools/agent";

export class PharosCreateImageTool extends Tool {
  name = "pharos_create_image";
  description =
    "Create an image using OpenAI's DALL-E. Input should be a string prompt for the image.";

  constructor(private pharosKit: PharosAgentKit) {
    super();
  }

  private validateInput(input: string): void {
    if (typeof input !== "string" || input.trim().length === 0) {
      throw new Error("Input must be a non-empty string prompt");
    }
  }

  protected async _call(input: string): Promise<string> {
    try {
      this.validateInput(input);
      const result = await create_image(this.pharosKit, input.trim());

      return JSON.stringify({
        status: "success",
        message: "Image created successfully",
        ...result,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
