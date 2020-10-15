import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.less']
})
export class NewsDetailsComponent implements OnInit {

  dataInfo:any = null;
  loading:boolean = true;
  newsId:number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params:Params) => {
      if(params) {
        this.newsId = +params['id'];
        this.getData();
      }
    })
  }

  ngOnInit(): void {
    
  }

  getData():void {
    console.log('this.current news Id', this.newsId);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dataInfo = {
        title: 'TikTok48小时倒计时？全球CEO离职内幕曝光 沃尔玛被传参与竞购',
        source: '新闻网',
        create_time: '2020-08-20',
        author: '张大山',
        view_number: '1024',
        content: `
        　　<p style="text-indent: 2em">“左手起诉，右手谈价”，近段时间，在特朗普政府的种种压力之下，TikTok的命运可以说牵动着世界目光。虽然字节跳动刚刚细数了特朗普政府的“七宗罪”，但也很明确胜算微乎其微。</p>
        　　<p style="text-indent: 2em">相比之下，出售TikTok是目前情况下损失最小的选择，根据CNBC8月27日晚间消息，TikTok即将达成出售其美国业务的协议，并可能会在未来48小时内与微软(226.58, 5.43, 2.46%)达成出
      售交易。</p>
      　　<p style="text-indent: 2em">最快48小时内出售？</p>
      　　<p style="text-indent: 2em">8月27日晚间，CNBC援引知情人士透露，TikTok即将达成出售其美国业务的协议，并可能在未来几天内宣布交易。并且，多个消息源还告诉CNBC，梅耶尔的辞职表明，TikTok很可能会在未
      来48小时内与微软达成出售交易。</p>
      　　<p style="text-indent: 2em">不过，CNBC还援引两位知情人士的话说，TikTok尚未决定买家，并仍在与甲骨文(57.18, -0.31, -0.54%)、微软和第三家美国公司讨论相关竞购事宜。</p>
      　　<p style="text-indent: 2em">此外，知情人士称，TikTok可能会出售其在美国、加拿大、澳大利亚和新西兰的业务，估值在200亿至300亿美元之间，但价格尚未决定。</p>
      　　<p style="text-indent: 2em">随着TikTok事件的进展，TikTok在全球范围内的业务情况也备受关注。根据此前已披露公开信息及字节跳动披露，TikTok过去一年在全球范围内获得了巨大的成功，目前，TikTok已覆盖超过
      200个国家，全球下载量超过20亿次。</p>
      　　<p style="text-indent: 2em">来自Sensor Tower的数据显示，2020年6月，TikTok是全世界被下载最多的非游戏类 App。2020年第一、二季度，TikTok在美国的下载量远超Facebook(293.22, -10.69, -3.52%)、Insta
      gram、YouTube。</p>
      　　<p style="text-indent: 2em">另外，TikTok在美国拥有月活跃用户超过9100万，1500多员工，以及数千家合作伙伴。字节跳动此前曾对外表示，TikTok在美国拥有超过1亿用户，1500多员工，以及数千家合作伙伴。如
      果关停TikTok美国业务，按照此前市场传闻200亿至500亿美金的出售价格，字节跳动将至少损失超过两千亿元。</p>
      　　<p style="text-indent: 2em">面对强势的特朗普政府，目前出售业务可能是损失最小的选择了。CNBC27日晚间透露的估值——200亿至300亿美元之间，刚好在此前市场传闻200亿至500亿美金范围的下边缘范围内。</p>
      　　<p style="text-indent: 2em">CNBC还在27日夜间指出，沃尔玛正与微软联手竞购TikTok，并表示这家零售巨头向CNBC证实，它对收购这家科技公司很感兴趣。从公开消息看，微软是最早与字节跳动商谈收购TikTok在
      美业务的巨头，在8月2日时，微软曾表示争取在9月15日之前完成商讨。</p>
      　　<p style="text-indent: 2em">受收购消息影响，8月27日夜间，美股开盘后，微软股价直接拉升，一度冲高涨4.52%，截至收盘，微软股价涨逾2%。</p>
      　　<p style="text-indent: 2em">而沃尔玛股价也因此飙升，截至收盘，沃尔玛暴涨逾4%。</p>
      　　<p style="text-indent: 2em">TikTok工程师据悉正制定关闭美国业务的应急预案</p>
      　　<p style="text-indent: 2em">媒体援引消息人士报道称，字节跳动本周在备忘录中要求TikTok的工程师制定应急预案，以应对关闭美国业务的情况。</p>
      　　<p style="text-indent: 2em">据报道，字节跳动还针对TikTok美国员工与供应商制定了单独的计划，以在业务关闭时仍能获得相关报酬。消息人士称，由于不确定性，TikTok已经在美国对大多数空缺职位实行了冻结招
      聘，仅招募了计划招聘的5%的员工。</p>
      　　<p style="text-indent: 2em">消息人士称，字节跳动将关闭准备工作视为一项备份计划，并正在努力达成一项协议，以确保TikTok在美国运营而不会受到干扰。</p>
      　　<p style="text-indent: 2em">全球CEO离职内幕曝光</p>
      　　<p style="text-indent: 2em">此外，美国CNBC还在27日晚间援引消息人士透露，TikTok首席执行官凯文·梅耶尔（Kevin Mayer）是在被排除在该公司与微软和甲骨文的交易谈判之外后辞职的。</p>
      　　<p style="text-indent: 2em">梅耶尔也在周四向TikTok及母公司字节跳动的员工透露了离职的消息。字节跳动方面已确认TikTok首席执行官凯文·梅耶尔辞任，并表示：尊重凯文的决定，也感谢他为TikTok付出过的努力。</p>
      　　<p style="text-indent: 2em">梅耶尔在离职信中表示，“最近几周，随着政治环境急剧变化，我认真思考了公司结构变化的要求，以及这对我当初应聘的这个全球角色意味着什么。在这种情况下，我们预计很快就会有解
      决办法，我怀着沉重的心情告诉大家，我已经决定离开公司。”</p>
      　　<p style="text-indent: 2em">梅耶尔还表示：“我深知，因为美国政府推动出售TikTok美国业务的行动，我所签约的角色--包括在全球范围内管理TikTok--将会有很大不同。”信中称，TikTok现任美国总经理瓦妮莎·帕帕
      斯（Vanessa Pappas）将担任公司临时负责人。</p>
      　　<p style="text-indent: 2em">根据公开资料，凯文·梅耶尔于今年6月1日正式加入字节跳动，担任字节跳动COO兼TikTok全球CEO，负责TikTok、Helo、音乐、游戏等业务，同时负责字节跳动全球部分职能部门（不含中
      国）。此前，凯文·梅耶尔在迪士尼(133.73, 1.55, 1.17%)工作过20多年，曾任公司高级执行副总裁兼首席战略官。</p>
      　　<p style="text-indent: 2em">小鹏汽车上市首日暴涨42%</p>
      `
      }
    }, 2000);
  }
}
