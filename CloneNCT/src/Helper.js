const cheerio = require('cheerio-without-node-native')
import React from 'react';


export default class Helper
{	

	static async getMp3Source(url){//lay link source mp3 tu url bai hat
		var xmlUrl=await this.getXmlUrl(url);//tu link bai hat, lay link xml
		let response = await fetch(xmlUrl);
	    let htmlString = await response.text();
	    var returnResult;
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString,{
	    	normalizeWhitespace: true,
    		xmlMode: true
	    });
	    //console.log($.xml());

	    var parseString = require('react-native-xml2js').parseString;//thu vien chuyen xml to json
		var xml =$.xml();
		parseString(xml, function (err, result) {//xu ly loc json ra source
			returnResult=result.tracklist.track[0].location[0];
			returnResult=returnResult.split(' ').join('');
			returnResult=returnResult.split('\n').join('');

			//console.log(returnResult);
		    
		});

		return returnResult;



	}
	static async getXmlUrl(url){
    if(url!='')
	    {
	    
	    let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString);
	    const temp=$(".playing_absolute");
	    //console.log(temp.get(0).childNodes[7].childNodes[0].data);
	    var firstvariable = "player.peConfig.xmlURL = ";
	    var secondvariable = ";n                                player.peConfig.defaultIndex";
	    var linksource = JSON.stringify(temp.get(0).childNodes[7].childNodes[0].data);
	    linksource=linksource.split('"').join('');
	    linksource = linksource.replace(/\n|\r|\\/g, "");

	        
	    linksource=linksource.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	    //console.log(linksource[1]); 
	    return linksource[1];
	    }  
  	}
  	static async getXmlUrlVideo(url){
    if(url!='')
	    {
	    
	    let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString);
	    const temp=$(".box-view-player");
	    //console.log(temp);
	    var firstvariable = "player.peConfig.xmlURL=";
	    var secondvariable = ";nplayer.load";
	    var linksource = JSON.stringify(temp.get(0).childNodes[3].childNodes[0].data);
	    linksource=linksource.split('"').join('');
	    linksource=linksource.split(' ').join('');
	    linksource=linksource.replace(/\n|\r|\\/g, "");
	    //console.log(linksource); 
	    linksource=linksource.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	    //console.log(linksource[1]); 
	    return linksource[1];
	    }  
  	}
  	static async getVideoSource(url){
		var xmlUrl=await this.getXmlUrlVideo(url);
		let response = await fetch(xmlUrl);
	    let htmlString = await response.text();
	    var returnResult;
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString,{
	    	normalizeWhitespace: true,
    		xmlMode: true
	    });
	    //console.log($.xml());

	    var parseString = require('react-native-xml2js').parseString;
		var xml =$.xml();
		parseString(xml, function (err, result) {
				
			returnResult=result.tracklist.track[0].item[0].location[0];
			//console.log(returnResult);
		    
		});

		return returnResult;



	}
	static async getSearchSongRespone(keyword)
	{	
		console.log('Helper Function getSearchSongRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/bai-hat?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".sn_search_single_song");
	    console.log(liList);
	    for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[0].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');     
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));
	        avatar=avatar[1];
	        title=liList.get(i).childNodes[1].attribs.title;
	        link=liList.get(i).childNodes[1].attribs.href;
	        singer_name=liList.get(0).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
	     //console.log(listItem);



		return listItem;
	}
	static async getSearchVideoRespone(keyword)
	{	
		console.log('Helper Function getSearchVideoRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/mv?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".small_item_video");
	    console.log(liList);
	    for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[1].childNodes[1].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));	        
	        avatar=avatar[1];
	        //console.log(avatar);   

	        title=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.title;
	        link=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.href;
	        singer_name=liList.get(i).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
	     //console.log(listItem);



		return listItem;
	}
	static async getSearchKaraokeRespone(keyword)
	{	
		console.log('Helper Function getSearchKaraokeRespone')
		var avatar,title,link,singer_name;
		var listItem=[];
		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com/tim-kiem/karaoke?q='+keyword+'&b=keyword&l=tat-ca&s=default';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".small_item_video");
	    //console.log(liList);
	    for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[1].childNodes[1].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));	        
	        avatar=avatar[1];
	        //console.log(avatar);   

	        title=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.title;
	        link=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.href;
	        singer_name=liList.get(i).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
	     //console.log(listItem);



		return listItem;
	}
	static async getNgheGiHomNay()
	{	
		console.log('Helper Function getNgheGiHomNay')
		var avatar,title,link,singer_name;
		var listItem=[];

		var firstvariable = "data-src:";
	    var secondvariable = ",onerror";
		const url= 'https://www.nhaccuatui.com';
		
		let response = await fetch(url);
	    let htmlString = await response.text();
	    //console.log(htmlString);
	    const $ = cheerio.load(htmlString); 
	    const liList=$(".small_item_video");
	    //console.log(liList);
	    for(i=0;i<liList.length;i++)
	      { 
	        var temp=liList.get(i).childNodes[1].childNodes[1].childNodes[1].attribs;      
	        avatar = JSON.stringify(temp);
	        avatar=avatar.split('"').join('');
	        avatar=avatar.match(new RegExp(firstvariable + "(.*)" + secondvariable));	        
	        avatar=avatar[1];
	        //console.log(avatar);   

	        title=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.title;
	        link=liList.get(i).childNodes[3].childNodes[1].childNodes[0].attribs.href;
	        singer_name=liList.get(i).childNodes[3].childNodes[3].childNodes[0].childNodes[0].data;

	        //console.log(title);
	        listItem=[...listItem,{
	        	'title':title,
	        	'link':link,
	        	'avatar':avatar,
	        	'singer_name':singer_name,
	        }];

	        
	      }
	     //console.log(listItem);



		return listItem;
	} 
} 