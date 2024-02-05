import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {Chapter} from "../../../model/chapter";
import {NgForOf} from "@angular/common";
import {EditChapterComponent} from "../edit-chapter/edit-chapter.component";

@Component({
  selector: 'edit-adventure',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    NgForOf,
    EditChapterComponent,
  ],
  templateUrl: './edit-adventure.component.html',
  styleUrl: './edit-adventure.component.css'
})
export class EditAdventureComponent {

  @ViewChild('chapterName') chapterName!: ElementRef;
  @ViewChild('subheader') subheader!: ElementRef;
  @ViewChild('approximateDurationInMinutes') duration!: ElementRef;
  @ViewChild('newChapterForm') newChapterForm!: NgForm;

  currentChapterIndex: number;
  chapters: Chapter[];
  newChapter: Chapter;
  adventureName: string;

  constructor() {
    this.currentChapterIndex = 0;
    this.chapters = [];
    this.newChapter = this.getNewChapter();
    this.adventureName = '';
  }

  private getNewChapter() {
    return new Chapter("", "", NaN, []);
  }

  addNewChapter() {
    if (this.newChapterForm.valid) {
      this.chapters.push(this.newChapter);
      this.newChapter = this.getNewChapter();
    }
  }

  trackChapters(index: number, chapter: Chapter) {
    return index;
  }

  chapterChanged(changedChapter: Chapter, chapterIndex: number) {
    this.chapters = [
      ...this.chapters.slice(0, chapterIndex),
      changedChapter,
      ...this.chapters.slice(chapterIndex + 1)
    ];
  }
}
