/**
* jQuery snsTimeF Plugin
* Version 0.01 (2012-09-10)
* Copyright (c) 2012 freegians
* 
* @requires http://code.jquery.com/jquery-latest.js
* 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* @example 
* var options = {
	minUnit		: "몇초",
	mmUnit		: "초",
	hUnit		: "시간",
	dUnit		: "일",
	mUnit		: "달",
	yUnit		: "년",
	maxUnit		: "오래",
	unit		: "전"
	};
* $("selector").snsTimeF(options);
* selector value : Unix Time;
* 
* 
*/ 

(function( $ ) {
	jQuery.fn.snsTimeF = function (options) {
		return this.each( function(){

			var settings = jQuery.extend({
				minUnit		: "몇초",
				mmUnit		: "분",
				hUnit		: "시간",
				dUnit		: "일",
				mUnit		: "달",
				yUnit		: "년",
				maxUnit		: "오래",
				unit		: "전"
			}, options);
		
			var minUnit	= settings.minUnit;
			var mmUnit	= settings.mmUnit;
			var hUnit	= settings.hUnit;
			var dUnit	= settings.dUnit;
			var mUnit	= settings.mUnit;
			var yUnit	= settings.yUnit;
			var maxUnit	= settings.maxUnit;
			var unit = settings.unit;
			var i;
			
			var pTime = '';						// 결과값
			var now = new Date();			// 현재시간
			var getTime = $(this).html();	// 현재시간에서 시간 가져오기
			getTime *= 1; 					// string to number
			now = ~~(now.getTime() / 1000);	// unix time 로 변경
			var ival = now - getTime;		// 시간차 구하기
			
			console.log("기준 : " + $(this).html());
			console.log("현재 : " + now);
			console.log("차이 : " + ival + "초후");
			
			if(ival < 0) return false;
			if(ival < 60) pTime = minUnit + unit;
			for(i = 1; i < 60; i++) {
				if(ival >= (60 * i) ) pTime = i + mmUnit + unit;
			}
			for(i = 1; i < 24; i++) {
				if(ival >= 60 * 60 * i) pTime = i + hUnit + unit;
			}
			for(i = 1; i < 30; i++) {
				if(ival >= 60 * 60 * 24 * i) pTime = i + dUnit + unit;
			}
			for(i = 1; i < 12; i++) {
				if(ival >= 60 * 60 * 24 * 30 * i) pTime = i + mUnit + unit;
			}
			
			if(ival >= 60 * 60 * 24 * 365) pTime = yUnit + unit;
			if(ival >= 60 * 60 * 24 * 365 * 2) pTime = maxUnit + unit;
			
			$(this).html(pTime);
		});
	};
})( jQuery );