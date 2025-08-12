import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { marked } from 'marked';

export interface Experience {
  title: string;
  company: string;
  period: string;
  content: string; // Changed from descriptions array to content string
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly contentBasePath = 'assets/content';

  constructor(private http: HttpClient) {
    // Configure marked to allow HTML and enable all features
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  /**
   * Load the summary content
   */
  loadSummary(): Observable<string> {
    return this.http.get(`${this.contentBasePath}/summary.md`, { responseType: 'text' })
      .pipe(
        map(content => {
          const result = marked(content);
          return typeof result === 'string' ? result : result.toString();
        }),
        catchError(error => {
          console.error('Error loading summary:', error);
          return of('');
        })
      );
  }

  /**
   * Load all experience files
   */
  loadExperiences(): Observable<Experience[]> {
    const experienceFiles = [
      'vertex-mckinsey.md',
      'cequens-senior-devops.md',
      'cequens-senior-software.md',
      'vrteek.md',
      'escapehd.md',
      'freelance.md'
    ];

    const requests = experienceFiles.map(file =>
      this.loadExperienceFile(file)
    );

    return forkJoin(requests).pipe(
      map(experiences => experiences.filter(exp => exp !== null) as Experience[]),
      catchError(error => {
        console.error('Error loading experiences:', error);
        return of([]);
      })
    );
  }

  /**
   * Load and parse a single experience file
   */
  private loadExperienceFile(filename: string): Observable<Experience | null> {
    return this.http.get(`${this.contentBasePath}/experiences/${filename}`, { responseType: 'text' })
      .pipe(
        map(content => this.parseExperienceMarkdown(content)),
        catchError(error => {
          console.error(`Error loading experience file ${filename}:`, error);
          return of(null);
        })
      );
  }

  /**
   * Parse markdown content into Experience object with full markdown support
   */
  private parseExperienceMarkdown(content: string): Experience {
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
          const value = trimmedLine.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
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
      content: typeof parsedContent === 'string' ? parsedContent : parsedContent.toString()
    };
  }
}
