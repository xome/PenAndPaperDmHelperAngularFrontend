import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {Chapter} from "../../../model/chapter";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'edit-chapter',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatInputModule,
    NgIf,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-chapter.component.html',
  styleUrl: './edit-chapter.component.css'
})
export class EditChapterComponent implements OnInit {
  @Input({required: true}) chapter!: Chapter;
  @Output() chapterChange = new EventEmitter<Chapter>();
  expanded = false;
  chapterToEdit!: Chapter;

  ngOnInit(): void {
    this.chapterToEdit = new Chapter(this.chapter.name,
      this.chapter.subheader,
      this.chapter.approximateDurationInMinutes,
      this.chapter.records);
  }

  editChapter() {
    this.chapter.name = this.chapterToEdit.name;
    this.chapter.subheader = this.chapterToEdit.subheader;
    this.chapter.approximateDurationInMinutes = this.chapterToEdit.approximateDurationInMinutes;
  }
}
