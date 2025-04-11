import axios from "axios";

// Bitbucket API base URL
const BITBUCKET_API_URL = "https://api.bitbucket.org/2.0";

// Repository details
const WORKSPACE = "allintra";
const REPO_SLUG = "teste-front-end";
const BRANCH = "main";
const DOCS_FOLDER = "docs";

interface BitbucketFile {
  type: string;
  path: string;
  size?: number;
}

interface BitbucketDirectory {
  values: BitbucketFile[];
}

/**
 * Fetches the list of Markdown files in the /docs folder
 */
export const getMarkdownFilesList = async (): Promise<BitbucketFile[]> => {
  try {
    const response = await axios.get<BitbucketDirectory>(
      `${BITBUCKET_API_URL}/repositories/${WORKSPACE}/${REPO_SLUG}/src/${BRANCH}/${DOCS_FOLDER}/`
    );

    return response.data.values.filter(
      (file) => file.type === "commit_file" && file.path.endsWith(".md")
    );
  } catch (error) {
    console.error("Error fetching markdown files list:", error);
    throw error;
  }
};

/**
 * Fetches the content of a specific Markdown file
 */
export const getMarkdownFileContent = async (
  filePath: string
): Promise<string> => {
  try {
    const response = await axios.get(
      `https://bitbucket.org/${WORKSPACE}/${REPO_SLUG}/raw/main/${filePath}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching markdown file content:", error);
    throw error;
  }
};
