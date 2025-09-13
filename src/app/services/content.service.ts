import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { marked } from 'marked';

export interface Data {
    title: string;
    company: string;
    period: string;
    content: string;
}

@Injectable({
    providedIn: 'root',
})
export class ContentService {
    private readonly contentBasePath = 'assets/content';

    constructor(private http: HttpClient) {
        // Configure marked to allow HTML and enable all features
        marked.setOptions({
            breaks: true,
            gfm: true,
        });
    }

    /**
     * Load the data content
     */
    loadSummary(): Observable<Data | null> {
        return this.loadDataFile('summary.md');
    }

    /**
     * Load the cover letter data
     */
    loadCoverLetter(): Observable<Data | null> {
        return this.loadDataFile('cover_letter.md');
    }

    /**
     * Load the experiences data
     */
    loadExperiences(dataFiles: string[]): Observable<Data[]> {
        return this.loadData(dataFiles, 'experiences');
    }

    /**
     * Load all data files
     */
    loadData(dataFiles: string[], subPath?: string): Observable<Data[]> {
        const requests = dataFiles.map((file) =>
            this.loadDataFile(file, subPath),
        );

        return forkJoin(requests).pipe(
            map((data) => data.filter((exp) => exp !== null) as Data[]),
            catchError((error) => {
                console.error('Error loading data:', error);
                return of([]);
            }),
        );
    }

    /**
     * Load and parse a single data file
     */
    private loadDataFile(
        filename: string,
        subPath?: string,
    ): Observable<Data | null> {
        const path = subPath
            ? `${this.contentBasePath}/${subPath}/${filename}`
            : `${this.contentBasePath}/${filename}`;
        return this.http.get(path, { responseType: 'text' }).pipe(
            map((content) => this.parseDataMarkdown(content)),
            catchError((error) => {
                console.error(`Error loading data file ${filename}:`, error);
                return of(null);
            }),
        );
    }

    /**
     * Parse markdown content into data object with full markdown support
     */
    private parseDataMarkdown(content: string): Data {
        const lines = content.split('\n');
        const frontMatter: { [key: string]: string } = {};
        let inFrontMatter = false;
        let frontMatterEnded = false;
        let contentLines: string[] = [];

        for (const line of lines) {
            const trimmedLine = line.trim();

            // Check for front matter start/end
            if (trimmedLine === '---') {
                if (!inFrontMatter) {
                    inFrontMatter = true;
                } else {
                    frontMatterEnded = true;
                }
                continue;
            }

            // Parse front matter
            if (inFrontMatter && !frontMatterEnded) {
                const colonIndex = trimmedLine.indexOf(':');
                if (colonIndex > 0) {
                    const key = trimmedLine.substring(0, colonIndex).trim();
                    const value = trimmedLine
                        .substring(colonIndex + 1)
                        .trim()
                        .replace(/^["']|["']$/g, '');
                    frontMatter[key] = value;
                }
                continue;
            }

            // Collect all content after front matter
            if (frontMatterEnded) {
                contentLines.push(line);
            }
        }

        // Convert content lines back to string and parse with marked
        const contentString = contentLines.join('\n').trim();
        const parsedContent = marked(contentString);

        return {
            title: frontMatter['title'] || '',
            company: frontMatter['company'] || '',
            period: frontMatter['period'] || '',
            content:
                typeof parsedContent === 'string'
                    ? parsedContent
                    : parsedContent.toString(),
        };
    }
}
