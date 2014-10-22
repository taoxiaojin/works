<?php
/*$aaa = 
	{
		data : [
			{
				
				sid : "5690799",//分类关系id，用于查找下级分类
				name : "生活电器",//分类名称
				spell : "shdq",//分类名称拼音首字母
				cateType : 0,//分类类型 0表示虚拟分类， 1表示品类， 2表示扩展分类
				hasNext : 1,//是否有下级分类，0表示否，1表示是
				isNotice : 0,//当前分类是否有对应的说明提示，0表示否，1表示是
				needCard : 0//是否需要签署电子协议，0表示否，1表示是
			},
			{
				
				sid : "5690709",//分类关系id，用于查找下级分类
				name : "大电器",//分类名称
				spell : "ddq",//分类名称拼音首字母
				cateType : 0,//当前分类是否是品类，0表示否，1表示是
				hasNext : 1,//是否有下级分类，0表示否，1表示是
				isNotice : 0,//当前分类是否有对应的说明提示，0表示否，1表示是
				needCard : 0//是否需要签署电子协议，0表示否，1表示是
	
			}
		],
		pName : "类目",
		sid : "0"
	}
*/
		
		/*$root = [
			['id' => '13', 'name' => '乒乓球'], 
			[ 'id' => '17', 'name' => '篮球'],
			[['id' =>'20', 'name' => '排球']]
		];*/
		
		$root = [
			"data" => [
				[
					"sid" => "56907991",
					"name" => "IT设备/数码产品/软件",
					"spell" => "itsb smcp rj",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907992",
					"name" => "家电/影音设备/专业灯光",
					"spell" => "jd yysb zydg",
					"cateType" => 2,
					"hasNext" => 0
				],
				[
					"sid" => "56907993",
					"name" => "家居用品/酒店/美容护理",
					"spell" => "jjyp jd mrhl",
					"cateType" => 1,
					"hasNext" => 1
				],
				[
				   "sid" => "56907994",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
					"sid" => "56907995",
					"name" => "服装服饰",
					"spell" => "fzfs",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907996",
					"name" => "运动/休闲/体育用品",
					"spell" => "yd xx tyyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
					"sid" => "56907997",
					"name" => "食品/饮料/农林牧副渔",
					"spell" => "sp yl nlmfy",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907998",
					"name" => "办公图书/教育装备",
					"spell" => "bgts jyzb",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907999",
					"name" => "机械及行业设备",
					"spell" => "jxjhysb",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079910",
					"name" => "五金/工具",
					"spell" => "wj gj",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079911",
					"name" => "运动/休闲/体育用品",
					"spell" => "yd xx tyyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079912",
					"name" => "食品/饮料/农林牧副渔",
					"spell" => "sp yl nlmfy",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079913",
					"name" => "办公图书/教育装备",
					"spell" => "bgts jyzb",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079914",
					"name" => "机械及行业设备",
					"spell" => "jxjhysb",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079915",
					"name" => "五金/工具",
					"spell" => "wj gj",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079916",
					"name" => "家电/影音设备/专业灯光",
					"spell" => "jd yysb zydg",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079917",
					"name" => "家居用品/酒店/美容护理",
					"spell" => "jjyp jd mrhl",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "569079918",
					"name" => "礼品工艺品/玩具/珠宝首饰",
					"spell" => "lpgyp wj zbss",
					"cateType" => 0,
					"hasNext" => 1
				]
				
			],
			"checkedSid" => ""
		];
		
		$sub = [
			"data" => [
				[
					"sid" => "569079911",
					"name" => "生活电器1",
					"spell" => "shdq",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907992",
					"name" => "大家电,没有下级",
					"spell" => "djd",
					"cateType" => 0,
					"hasNext" => 0
				],
				[
					"sid" => "569079933",
					"name" => "厨房用品1",
					"spell" => "cfyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907994",
					"name" => "建筑用品",
					"spell" => "jzyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
					"sid" => "56907995",
					"name" => "卫生用品",
					"spell" => "wsyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907996",
					"name" => "农业用品",
					"spell" => "nyyp",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
					"sid" => "56907997",
					"name" => "手机",
					"spell" => "sj",
					"cateType" => 0,
					"hasNext" => 1
				],
				[
				   "sid" => "56907998",
					"name" => "电脑",
					"spell" => "dn",
					"cateType" => 0,
					"hasNext" => 1
				]
			],
			"pName" => "类目",
			"sid" => "0"
		];
		
		$noData = [
			"data" => [
				
			],
			"pName" => "类目",
			"sid" => "0"
		];
		
		if( isset($_POST["sid"]) && $_POST["sid"] === "56907991"){
			echo json_encode($sub);
		}else if(isset($_POST["sid"]) && $_POST["sid"] === "56907992"){
			echo json_encode($noData);
		}else{
			echo json_encode($root);
		}
		
?>