/* file for all interfaces used by the "About Us" page */

/* interface for each group member */
export interface GroupMember {
    name: string;
    email: string;
    username?: string;
    bio?: string;
    image: any;
    commits?: number;
    issues?: number;
    unittest?: number;
}
  
/* interfaces for all GitLab related data */

export interface Gitlab {
    data: Data;
    status: number;
    statusText: string;
    headers: GITLABHeaders;
    config: Config;
    request: Request;
}
  
export interface Config {
    url: string;
    method: string;
    headers: ConfigHeaders;
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
}
  
export interface ConfigHeaders {
    Accept: string;
}
  
export interface Data {
    statistics: Statistics;
}
  
export interface Statistics {
    counts: Counts;
}
  
export interface Counts {
    all: number;
    closed: number;
    opened: number;
}
  
export interface CommitsInfo {
    name: string;
    email: string;
    commits: number;
    additions: number;
    deletions: number;
}
  
export interface GITLABHeaders {
    "cache-control": string;
    "content-type": string;
}
  
export interface Request { }