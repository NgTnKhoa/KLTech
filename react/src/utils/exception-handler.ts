export const handleApiError = async (error: unknown, fallbackValue: any) => {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      console.error("Request aborted:", error.message);
      throw new Error("Request was aborted. Please try again.");
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error:", error.message);
      throw new Error(
          "Unable to connect to the server. Please check your internet connection.",
      );
    }

    console.error("API error:", error.message);
    throw new Error(error.message || "An error occurred while fetching data");
  }

  console.error("Unexpected error:", error);
  return fallbackValue;
};
