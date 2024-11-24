import FetchResource from "api/crud";

export const handleDownloadClick = async () => {
  try {
    const response = await FetchResource.download("stocks");

    // Create download url
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kitoblar.csv";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    // Handle error (e.g., show notification to user)
  }
};
