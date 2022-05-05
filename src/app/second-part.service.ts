import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class SecondPartService {

  private topWords = new BehaviorSubject<any>([]);
  topWordsObservable = this.topWords.asObservable();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getSummary(url: string) {
    // 'description' is used because text_out property does not exist on the given api response
    this.http.get<RestaurantInterface>(url).pipe(map(data => data.description)).subscribe((description: string) => {
      const topTenWords = findTopTenMostRepeatedWords(description);
      const topWordsList = [...this.topWords.value, topTenWords];
      this.topWords.next(topWordsList);
    }, error => {
      console.log(error)
      this._snackBar.open(error.message, 'Ok', {
        duration: 3000
      });
      this.topWords.next([...this.topWords.value]);
    });
  }
}

export function findTopTenMostRepeatedWords(str: string) {
  let words = str.split(' ') || [];
  words = words.map(word => word.replace(/[^a-zA-Z ]/g, '').toLowerCase()).filter(Boolean);

  let occurrences: any = {};

  for (let word of words) {
    if (occurrences[word]) {
      occurrences[word]++;
    } else {
      occurrences[word] = 1;
    }
  }

  const occurrencesCopy = {...occurrences};
  const topTen = [];
  for (let i = 0, len = 10; i < len; i++) {
    if (Object.keys(occurrencesCopy).length === 0) {
      break;
    }
    const top = Object.keys(occurrencesCopy).reduce((a, b) => (occurrencesCopy[a] > occurrencesCopy[b]) ? a : b);
    topTen.push({key: top, value: occurrencesCopy[top]});
    delete occurrencesCopy[top];
  }

  return topTen;
}

interface RestaurantInterface {
  address: string;
  description: string;
  hours: any;
  id: number;
  logo: string;
  name: string;
  phone_number: string;
  review: string;
  type: string;
  uid: string;
}
