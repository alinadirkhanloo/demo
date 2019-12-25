
import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud';
import { ApiService } from 'src/app/services/api.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})

export class WordCloudComponent implements OnInit {
  private recived_data = [];
  constructor(private apiService: ApiService, private data_shared: DataSharingService) { }
  ngOnInit() {
    this.load_data();
    setTimeout(() => { this.loadChart(this.preProc(this.recived_data)); }, 400);
  }

  loadChart(data) {
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_material);
    // Themes end
    const chart = am4core.create('word-cloud-div', am4plugins_wordCloud.WordCloud);
    const series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 200;
    series.minWordLength = 2;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);
    series.data = data;
    series.dataFields.word = 'tag';
    series.dataFields.value = 'weight';
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop
    series.angles = [0, -90];
    series.fontWeight = '700';
  }

  load_data() {
    this.apiService.getTOpWords().subscribe(data => {
      // console.log(data)
      this.recived_data = data['body'];
    });
  }

  preProc(data) {
    const temp = [];
    // tslint:disable-next-line: forin
    for (const item in data) {
      temp.push({
        tag: data[item].text,
        weight: data[item].weight
      });
    }
    return temp;
  }
}
