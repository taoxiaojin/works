$(function(){
	var tabItems = $(".ind-tab").find(".ind-tab-item")
	var csItem = $(".cs-contents").find(".cs-item")
	tabItems.on("click", function(){
		var me = $(this)
		var index = me.index()
		var controlShowOrHide = (index === 0) ? $(".tipselradio").show() : $(".tipselradio").hide()
		me.addClass("current").siblings().removeClass("current")
		csItem.eq( index ).show().siblings().hide()
		return false
	})
})

$(function(){

	var Class = {
		create: function() {
			return function() { this.initialize.apply(this, arguments) }
		}
	}
	var Extend = function(destination, source) {
		for (var property in source) {
			destination[property] = source[property]
		}
	}
	var ClassSelect = Class.create()
	ClassSelect.cacheObj = {}
	var domObj = ClassSelect.domObj = {
		csBoxItem : "cs-box-item",
		csListItemSelected : "cs-listItem-selected",
		
	}
	
	ClassSelect.prototype = {
		initialize : function( options ){
			var me = this
			me.setOptions( options )
			var myOptions = me.options
			myOptions.boxContent.width( myOptions.hasShowNum * myOptions.boxItemOuterWidth )
			myOptions.cateLoading.width( myOptions.hasShowNum * myOptions.boxItemOuterWidth )
			myOptions.cateLoading.height( myOptions.innerContentHeight + 22*2 )
			me.handleFirstPost()
			me.handleClickLabel()
			me.handleClickItem()
			me.handleKeyupFilter()
			me.options.prev.bind( "click", function(){ me.prevClick() } )
			me.options.next.bind( "click", function(){ me.nextClick() } )
			me.handleBtnHover( me.options.prev, "cs-box-hoverPrev" )
			me.handleBtnHover( me.options.next , "cs-box-hoverNext" )
		},
		setOptions : function( options ){
		    var slide = $(".cs-box")
			
			this.options = {//初始化设置
				hasShowNum : 4, //默认可视区四级
				boxItemOuterWidth : 272, //单个类目模块的宽度
				prevSection : 0, //上翻区分类模块数量
				nextSection : 0,//下翻区分类模块数量
				innerContentHeight : 303,
				listboxItemOuterHeight : 27, //一条类目的高度包括边框
				prev : slide.find(".cs-box-prev"),
				next : slide.find(".cs-box-next"),
				inner : slide.find(".cs-box-innerContent"),
				boxContent : slide.find(".cs-box-content"),
				cateLoading : slide.find(".cate-loading"),
				whenCateTypeIs0 : function(){},
				whenCateTypeIs1 : function(){},
				whenCateTypeIs2 : function(){}
			}
			
			Extend( this.options, options || {} )
		},
		handleFirstPost : function(){
			var me = this
			var inner = me.options.inner
			var root = me.getData( {"path" : "first"} )
			$(".cate-loading").css( {"opacity" : 0.8} )
			root.done(function(data){
				inner.append( me.createHtml( data.data ) )
			}).always(function(){
				$(".cate-loading").hide();
			})
		},
		getData : function(data){
			return $.ajax({
						type : "POST",
						url : "data.php",
						data : data,
						dataType : "json"
					})
		},
		handleClickItem : function(){
			var me = this
			me.options.inner.on("click", "li.cs-listbox-item", function(){
				var self = $(this) //用户点击的dom元素
				var meParent = self.parents(".cs-box-item")
				meParent.nextAll().remove() //清空点击元素所在的item元素后面的item元素
				
				var prevNum = meParent.prevAll().length //获取当前item元素前面有几个item元素；当prevNum为3时，出现滚动效果，并出现上一页按钮
				//要知道点击了showSection区里的几号区域。（区域编号从左到右分别是1、2、3、4）
				//用prevNum - prevSection + 1 就是当前的区域编号
				var sectionNum = prevNum - me.options.prevSection + 1
				
				self.addClass("cs-listItem-selected").siblings().removeClass("cs-listItem-selected").removeClass("cs-listItem-focused")
				//me.handleNav()
				
				//当点击元素有没有 class "cs-listItem-hasChild"时说明没有下一级，没必要ajax请求了
				if( !self.hasClass("cs-listItem-hasChild") ){
					me.handleScrollWhenNoData( sectionNum )
				}else{
					var sid = self.data("sid")
					if( sid ==="" ){ return }
					if( !ClassSelect.cacheObj[sid] ){
						$(".cate-loading").show()
						ClassSelect.cacheObj[sid] = me.getData( {"path" : "first", "sid" : sid} )
					}
					ClassSelect.cacheObj[sid].done(function(data){
						me.options.inner.append( me.createHtml( data.data ) )
						me.handleScrollWhenHasData( sectionNum )
					}).always(function(){
						$(".cate-loading").hide()
					})
				}
				me.options.nextSection = 0
				me.options.next.addClass("vh")

				me.handleFocusFilter(self)
				
				switch( self.data("catetype") )
				{
					case 0 : 
						me.options.whenCateTypeIs0()
						break
					case 1 : 
						me.options.whenCateTypeIs1()
						break
					case 2 : 
						me.options.whenCateTypeIs2() 
				}
				
			})
		},
		handleNav : function(){
			var str = ""
			var selectedNodes = $(".cs-listItem-selected:not([data-catetype='2'])")
			var length = selectedNodes.length
			selectedNodes.each(function(index){
				var me = $(this)
				if( me.data("catetype") === 1 ){
					str = str + $(this).text() 
					return false
				}else{
					str = ( index === length -1 ) ? str + $(this).text() + "&nbsp;&gt;&nbsp;..." : str + $(this).text() + "&nbsp;&gt;&nbsp;"
				}
			})
			$(".tipselradio-className").html( str )
		},
		handleFocusFilter : function(clickNode){
			var filterInput = clickNode.parents(".cs-box-item").find(".cs-box-filter-input")
			filterInput.focus()
		},
		handleClickLabel : function(){
			var me = this
			me.options.inner.on("click", ".cs-box-filter > label", function(){
				$(this).next(".cs-box-filter-input").focus()
			})
		},
		handleKeyupFilter : function(){
			var me = this
			var focusedNode = ""
			me.options.inner.on("keyup", ".cs-box-filter-input", function(e){
				var self = $(this)
				var inputValue = self.val()
				var inputValueLength = inputValue.length
				var listItem = self.parents(".cs-box-item").find(".cs-listbox-item")				
				if( inputValueLength === 0 ){
					self.prev("label").show()
					listItem.each(function(){
						if( $(this).find(".filter-red").length > 0 ){
							$(this).text( $(this).text() )
						}
					})
					listItem.show()
				}else if( inputValue.length > 0 ){
					self.prev("label").hide()
					if( e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13 && e.keyCode !==37 && e.keyCode !==39 ) {
						//虚拟分类和品类含有拼音首字母的匹配；扩展分类没有拼音首字母的匹配，只有按文字匹配。所以在程序处理时要判断扩展分类
						me.handleHighlightWord(listItem, inputValue)
					}
				}
				if( e.keyCode === 40 ){
					me.handleKeydown40(self)
				}
				if( e.keyCode === 38 ){
					me.handleKeydown38(self)
				}
				if( e.keyCode === 13 ){
					var focusedNode = self.parents(".cs-box-item").find(".cs-listItem-focused")
					focusedNode && focusedNode.trigger("click")
					return false
				}
			})
		},
		handleKeydown38 : function(self){
			var me = this
			var selectedNode = self.parents(".cs-box-item").find(".cs-listItem-selected:visible")
			var focusedNode = self.parents(".cs-box-item").find(".cs-listItem-focused:visible")		
			var listItem = self.parents(".cs-box-item").find(".cs-listbox-item:visible")
			self.prev("label").hide()
			
			if( focusedNode && focusedNode.length > 0 ){
				me.handleKeydown38ByNodeSituation( focusedNode, self, 1 )
			}else if( selectedNode && selectedNode.length > 0 ){
				me.handleKeydown38ByNodeSituation( selectedNode, self )
			}else{
				var firstVisibleNode = listItem.last()
				firstVisibleNode.addClass("cs-listItem-focused")
				self.val( firstVisibleNode.text() )
				
				var listboxShell = firstVisibleNode.parents(".cs-listboxShell")
				var scrollHeight = listboxShell[0].scrollHeight
				var listboxShellOuterHeight = listboxShell.outerHeight()
				listboxShell[0].scrollTop = scrollHeight - listboxShellOuterHeight
			}
			self.parents(".cs-box-item").find(".cs-box-filter-input")[0].select()
		},
		whenKeydown38HandleScroll : function( self, firstVisibleNode ){
			var listItem = self.parents(".cs-box-item").find(".cs-listbox-item:visible")
			var top = firstVisibleNode.position().top
			var listboxShell = firstVisibleNode.parents(".cs-listboxShell")
			var listboxShellHeight = listboxShell.height()
			var listboxShellOuterHeight = listboxShell.outerHeight()
			var listItemOuterHeight = listItem.outerHeight()
			var paddingTop = parseInt( listboxShell.css("paddingTop") )
			
			if( top < paddingTop ){
				listboxShell[0].scrollTop =  listboxShell[0].scrollTop  > ( listboxShellHeight -  listItemOuterHeight ) ?  listboxShell[0].scrollTop - ( listboxShellHeight -  listItemOuterHeight ) : 0
			}else if( top > ( listboxShellHeight -  listItemOuterHeight + paddingTop ) ){
				listboxShell[0].scrollTop = listboxShell[0].scrollTop + top - ( listboxShellHeight -  listItemOuterHeight + paddingTop )
			}
		},
		handleKeydown38ByNodeSituation : function( node, self, situation){
			var me = this
			var prevAllNode = node.prevAll(":visible")
			if( prevAllNode.length === 0 ){ return }
			var firstVisibleNode = prevAllNode.first()
			if( situation === 1 ) node.removeClass("cs-listItem-focused")
			firstVisibleNode.addClass("cs-listItem-focused")
			self.val( firstVisibleNode.text() )			
			me.whenKeydown38HandleScroll( self, firstVisibleNode )
		},
		handleKeydown40 : function(self){
			var me = this
			var selectedNode = self.parents(".cs-box-item").find(".cs-listItem-selected:visible")
			var focusedNode = self.parents(".cs-box-item").find(".cs-listItem-focused:visible")			
			var listItem = self.parents(".cs-box-item").find(".cs-listbox-item:visible")
			self.prev("label").hide()
			if( focusedNode && focusedNode.length > 0 ){
				me.handleKeydown40ByNodeSituation( focusedNode, self, 1 )
			}else if( selectedNode && selectedNode.length > 0 ){
				me.handleKeydown40ByNodeSituation( selectedNode, self )
			}else{
				var firstVisibleNode = listItem.first()
				firstVisibleNode.addClass("cs-listItem-focused")
				self.val( firstVisibleNode.text() )				
				var listboxShell = firstVisibleNode.parents(".cs-listboxShell")
				listboxShell[0].scrollTop = 0
			}
			self.parents(".cs-box-item").find(".cs-box-filter-input")[0].select()
		},
		handleKeydown40ByNodeSituation : function( node, self, situation){
				var me = this
				var nextAllNode = node.nextAll(":visible")
				if( nextAllNode.length === 0 ){ return }
				var firstVisibleNode = nextAllNode.first()
				if( situation === 1 ) node.removeClass("cs-listItem-focused")
				firstVisibleNode.addClass("cs-listItem-focused")
				self.val( firstVisibleNode.text() )
				me.whenKeydown40HandleScroll( self, firstVisibleNode )		
		},
		whenKeydown40HandleScroll : function( self, firstVisibleNode ){
			var listItem = self.parents(".cs-box-item").find(".cs-listbox-item")
			var top = firstVisibleNode.position().top
			var listboxShell = firstVisibleNode.parents(".cs-listboxShell")
			var listboxShellHeight = listboxShell.height()
			var listboxShellOuterHeight = listboxShell.outerHeight()
			var listItemOuterHeight = listItem.outerHeight()
			var paddingTop = parseInt( listboxShell.css("paddingTop") )
			
			if( top >= listboxShellHeight ){
				var scrollHeight = listboxShell[0].scrollHeight
				listboxShell[0].scrollTop =  ( scrollHeight - ( listboxShellOuterHeight + listboxShell[0].scrollTop ) ) > ( listboxShellHeight - listItemOuterHeight )
														? ( listboxShellHeight - listItemOuterHeight ) + listboxShell[0].scrollTop
														:  (scrollHeight - listboxShellOuterHeight) + listboxShell[0].scrollTop
			}else if( top < paddingTop ){
				listboxShell[0].scrollTop = listboxShell[0].scrollTop - ( paddingTop - top )
			}
		},
		findFirstVisibleNode : function(nodes){
			var firstVisibleNode
			nodes.each(function(index,value){
				if( $(this).is(":visible") ){
					firstVisibleNode = $(this)
					return false
				}
			})
			return firstVisibleNode
		},
		handleHighlightWord : function(listItem, inputValue){
			var letterReg = /[A-Za-z]+/
			var filterword = ""

			if( !letterReg.test( inputValue ) ){
				var nowValReg = new RegExp( "(" + inputValue + ")" )
				listItem.each(function(index,value){
					var me = $(this)
					if( !nowValReg.test( me.text() ) ) {
						me.hide() 
					}else{
						filterword = RegExp.$1
						var newText = me.text().replace( filterword, "<span class='filter-red'>" + filterword + "</span>")
						me.html(newText)
						me.show()
					} 
				})
			}else{
				var nowValReg = new RegExp( "(" + inputValue.toLowerCase() + ")" )
				listItem.each(function(index,value){
					var me = $(this)
					if( !nowValReg.test( me.data("spell") ) ) {
						me.hide() 
					}else{
						filterword = RegExp.$1
						var filterwordLength = filterword.length
						var spellArr = me.data("spell").split(" ")
						var listItemValueArr = me.text().split( "/" )
						$.each(spellArr, function(index, value){
							var letterIndex = value.indexOf( filterword )
							if( letterIndex > -1 ){
								var needHLWords = listItemValueArr[index].slice( letterIndex, letterIndex+filterwordLength )
								listItemValueArr[index] = listItemValueArr[index].replace( needHLWords, "<span class='filter-red'>" + needHLWords + "</span>" )
								return false
							}
						})
						me.html( listItemValueArr.join("/") )
						me.show() 
					} 
				})
			}
		},
		handleScrollWhenNoData : function( sectionNum ){
			var me = this
			var hasShowNum = me.options.hasShowNum
			if( sectionNum === hasShowNum ){

			}else if( sectionNum ===hasShowNum-1 ){
				if( me.options.prevSection > 0 ){
					me.handleLeftToRight(1)
				}
			}
			for(var index = hasShowNum -2; index > 0; index-- ){
				if( index === 0 ){ return }
				if( sectionNum === index ){
					if( me.options.prevSection > 0 ){
						if( me.options.prevSection > ( hasShowNum - index  ) ){
							me.handleLeftToRight( hasShowNum - index )
						}else{
							me.handleLeftToRight( me.options.prevSection )
						}
					}
				}
			}
		},
		handleScrollWhenHasData : function( sectionNum ){
			var me = this
			var hasShowNum = me.options.hasShowNum
			if( sectionNum ===hasShowNum ){
				me.handleRightToLeft()					
			}else if( sectionNum === hasShowNum - 1 ){
				
			}
			for(var index = hasShowNum -2; index > 0; index-- ){
				if( index === 0 ){ return }
				if( sectionNum === index ){
					if( me.options.prevSection > 0 ){
						if( me.options.prevSection > ( hasShowNum - ( index + 1) - 1 ) ){
							me.handleLeftToRight( hasShowNum - ( index + 1) )
						}else{
							me.handleLeftToRight( me.options.prevSection )
						}
					}
				}

			}
		},
		handleLeftToRight : function( num ){
			var me =this
			var inner = me.options.inner
			var prev = me.options.prev
			inner.animate({marginLeft : parseInt(inner.css("marginLeft")) + me.options.boxItemOuterWidth*num},100)
			me.options.prevSection = me.options.prevSection - num
			if( me.options.prevSection === 0 ){ prev.addClass("vh") }
		},
		handleRightToLeft : function(){
			var me =this
			var inner = me.options.inner
			var prev = me.options.prev
			inner.animate({marginLeft : parseInt(inner.css("marginLeft")) - me.options.boxItemOuterWidth},100)
			me.options.prevSection = me.options.prevSection + 1
			prev.removeClass("vh")						
		},
		createHtml : function( dataArr ){
			var me = this
			var boxItem = $("<div class='cs-box-item' style='width:" + ( me.options.boxItemOuterWidth - 2 ) + "px'>")
			boxItem.append( me.createFilter( dataArr ) )
			boxItem.append( me.createItem( dataArr ) )
			return boxItem
		},
		createFilter : function( dataArr ){
			var me = this 
			var inputWidth = me.options.listboxItemOuterHeight * dataArr.length  >  ( me.options.innerContentHeight - 2 - 33 )  ? 
									   me.options.boxItemOuterWidth - 2 - 3 - 25 - 20 : me.options.boxItemOuterWidth -2 - 3 - 25 - 5
     		//输入名称或拼音首字母
			var str = '<div class="cs-box-filter">\
								<label for="">&#36755;&#20837;&#21517;&#31216;&#25110;&#25340;&#38899;&#39318;&#23383;&#27597;</label>\
								<input type="text" style="width:' + inputWidth + 'px"class="cs-box-filter-input"/>\
							</div>'
			return $(str)
		},
		createItem : 	function( dataArr ){
			var me = this
			var listboxShellHeight = me.options.innerContentHeight - 2 - 33
			var htmlStr = "<div class='cs-listboxShell' style='height:" + listboxShellHeight + "px'><ul class='cs-listbox'>"
			$.each(dataArr,function(index,value){
				var className = !!value.hasNext  ?  "cs-listbox-item cs-listItem-hasChild" : "cs-listbox-item"
				htmlStr += "<li class='" +className + "' data-catetype='" + value.cateType + "' data-sid='" + value.sid+ "' data-spell='" + value.spell + "'>"+value.name+"</li>"
			})
			htmlStr += "</ul></div>"
			return $( htmlStr )
		},
		prevClick : function(){
			var me = this
			var next = me.options.next
			var prev = me.options.prev
			var inner = me.options.inner
			next.removeClass("vh");
			me.options.prevSection--;
			me.options.nextSection++;
			if(me.options.prevSection===0){
				prev.addClass("vh");
			}
			inner.animate({marginLeft : parseInt(inner.css("marginLeft"))+me.options.boxItemOuterWidth},100);	
		},
		nextClick : function(){
			var me = this
			var next = me.options.next
			var prev = me.options.prev
			var inner = me.options.inner
			prev.removeClass("vh");
			me.options.nextSection--
			me.options.prevSection++
			if(me.options.nextSection==0){
				next.addClass("vh");
			}
			inner.animate({marginLeft : parseInt(inner.css("marginLeft")) - me.options.boxItemOuterWidth},100);
		},
		handleBtnHover : function(btn, className){
			btn.hover( function(){
				$(this).addClass( className )
			}, function(){
				$(this).removeClass( className )
			} )
		}
		
	}
	
	new ClassSelect({
		"hasShowNum" : 3,
		"boxItemOuterWidth" : 252,
		"whenCateTypeIs0" : function(){
			console.log(0)
		},
		"whenCateTypeIs1" : function(){
			console.log(1)
		}
	})
})