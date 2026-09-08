(() => {
  "use strict";

  const makeRecord = (spec) => {
    const { chapters = [], body, ...rest } = spec;
    return {
      subtitle: "FIELD DOSSIER / SOURCE-LED READING",
      type: "研究",
      status: "科学研究",
      imageKey: "ancient",
      tags: [],
      ...rest,
      body:
        body ||
        chapters
          .flatMap((chapter) => (Array.isArray(chapter.p) ? chapter.p : [chapter.p]))
          .filter(Boolean)
          .slice(0, 3),
      expandedSections: chapters,
    };
  };

  const supplement = [
    {
      id: "ancient-rapa-nui",
      category: "ancient",
      section: "史前遗迹卷宗",
      type: "档案",
      year: 1994,
      region: "智利 · 拉帕努伊岛",
      tags: ["复活节岛", "摩艾", "拉帕努伊", "世界遗产", "考古"],
      status: "官方资料",
      evidenceLabel: "世界遗产档案",
      title: "拉帕努伊摩艾：孤岛上的祖先景观",
      subtitle: "RAPA NUI / MOAI LANDSCAPE",
      summary: "把摩艾从‘神秘巨像’的单一叙事中取出来，回到拉帕努伊人的聚落、祭祀平台与采石场系统。",
      source: "UNESCO 世界遗产中心",
      sourceOrg: "UNESCO",
      sourceUrl: "https://whc.unesco.org/en/list/715/",
      publishedAt: "1994",
      imageKey: "ancient",
      facts: {
        "定居时间": "约公元 300 年起",
        "主要建造期": "约 10—16 世纪",
        "遗址构成": "约 900 尊摩艾、300 余座 ahu 平台",
        "世界遗产列入": "1995 年",
      },
      chapters: [
        {
          h: "摩艾不是孤立的石像",
          p: [
            "UNESCO 的遗产描述把拉帕努伊国家公园视为一个文化景观：摩艾、ahu 祭祀平台、居住遗址、农业设施、岩画和采石场共同构成社会记忆。摩艾代表祖先，而平台连接仪式、家族和海岸线的空间秩序。",
            "约 900 尊摩艾并不意味着每一尊都已完成或被立起。拉诺·拉拉库采石场仍能看到半成品、运输途中和未脱离岩壁的雕像，这些‘停在过程中的物证’比单一成品更能说明生产链。",
          ],
        },
        {
          h: "工程能力与运输争议",
          p: [
            "摩艾多用火山凝灰岩雕刻，工具主要是坚硬玄武岩制成的 toki。雕像从采石场下到海岸的运输方式仍有讨论，实验考古提出‘行走’式摆动、滑橇和木材辅助等不同模型；模型必须同时解释路线、地形、断裂痕迹和人力需求。",
            "把运输难题直接转换成‘失落高科技’并不能增加证据。现有遗址显示的是对材料、重心、绳索和集体协作的长期掌握，技术史价值恰恰在于这种可重复、可检验的组织能力。",
          ],
        },
        {
          h: "生态危机叙事需要证据链",
          p: [
            "拉帕努伊历史常被简化为‘砍光森林导致崩溃’。近年的考古和古环境研究更强调多因素：农业方式、海鸟资源、鼠类影响、气候波动、欧洲殖民、奴役和传染病都参与了人口与社会变化。单因果故事无法覆盖遗址记录。",
            "UNESCO 同时指出火山凝灰岩风化、降雨和旅游压力对遗产保存构成持续风险。保护档案提醒我们：研究未知文明时，先保护现场和社区，再谈宏大的外来解释。",
          ],
        },
      ],
    },
    {
      id: "ancient-catalhoyuk",
      category: "ancient",
      section: "史前文明时间线",
      type: "研究",
      year: 2012,
      region: "土耳其 · 安纳托利亚",
      tags: ["恰塔尔霍裕克", "新石器时代", "聚落", "农业", "考古"],
      status: "官方资料",
      evidenceLabel: "世界遗产档案",
      title: "恰塔尔霍裕克：没有街道的早期聚落",
      subtitle: "ÇATALHÖYÜK / NEOLITHIC SETTLEMENT",
      summary: "通过连续地层、屋顶出入口和壁画遗存，观察定居生活如何逐渐形成城市式聚落。",
      source: "UNESCO 世界遗产中心",
      sourceOrg: "UNESCO",
      sourceUrl: "https://whc.unesco.org/en/list/1405",
      publishedAt: "2012",
      imageKey: "gobekli",
      facts: {
        "东丘年代": "约公元前 7400—6200 年",
        "西丘年代": "约公元前 6200—5200 年",
        "遗址面积": "约 37 公顷",
        "建筑特征": "房屋背靠背，主要由屋顶进入",
      },
      chapters: [
        {
          h: "十八层生活史",
          p: [
            "UNESCO 记录的东丘包含 18 个新石器时代居住层，时间跨度约一千二百年。连续叠压的房屋、炉灶、储藏设施和修补痕迹，让考古学家可以观察家庭结构与生活方式的长期变化，而不是只看一件出土物。",
            "西丘则延续到铜石并用时代。东西两丘不能被拼成一个同时代的‘超级城市’，年代与功能差异是理解遗址的第一道边界。",
          ],
        },
        {
          h: "屋顶就是街道",
          p: [
            "聚落房屋紧密相连，几乎没有传统意义上的街道，人们通过屋顶和梯子进出。屋顶可能承担交通、晾晒和公共活动功能，室内则有壁炉、储藏坑和墙面装饰。建筑布局把家庭生活、邻里关系和仪式空间叠在一起。",
            "壁画、浮雕和动物遗存经常被网络内容剪裁成‘史前星图’或‘外星人画像’。严谨做法是保留图像的出土位置、地层和共存材料，再讨论它可能的象征含义。",
          ],
        },
        {
          h: "从村落到城市并非一条直线",
          p: [
            "恰塔尔霍裕克重要之处不在于它是否符合现代城市定义，而在于它显示定居农业、人口聚集、象征艺术与社会组织可以同时演变。遗址没有王宫或大型行政建筑，却拥有长时间的共同生活记录。",
            "它与哥贝克力石阵、杰里科等遗址放在同一时间线时，可以看到‘农业先发生、城市后出现’并不是所有地区都适用的单向公式。考古证据更像多条互相影响的路径。",
          ],
        },
      ],
    },
    {
      id: "ancient-liangzhu",
      category: "ancient",
      section: "史前文明时间线",
      type: "档案",
      year: 2019,
      region: "中国 · 浙江余杭",
      tags: ["良渚", "新石器时代", "水利系统", "玉器", "早期国家"],
      status: "官方资料",
      evidenceLabel: "世界遗产档案",
      title: "良渚古城：稻作、水利与早期区域国家",
      subtitle: "LIANGZHU / EARLY URBAN CIVILIZATION",
      summary: "从城址、外围水利系统、等级墓地和玉器组合，重建长江下游五千年前的区域文明。",
      source: "UNESCO 世界遗产中心",
      sourceOrg: "UNESCO",
      sourceUrl: "https://whc.unesco.org/en/list/1592",
      publishedAt: "2019",
      imageKey: "sanxingdui",
      facts: {
        "主要年代": "约公元前 3300—2300 年",
        "遗产组成": "城址、外围水利、等级墓地与祭坛等四类区域",
        "经济基础": "稻作农业",
        "列入名录": "2019 年，标准 (iii)(iv)",
      },
      chapters: [
        {
          h: "把城市放回湿地与山地之间",
          p: [
            "良渚遗址位于太湖流域水网平原与天目山前缘。UNESCO 认定的遗产范围不是一座孤立城墙，而是由城址、外围高低坝、墓地和自然地形共同组成的系统。水利设施的规模说明城市规划与环境管理同步展开。",
            "四个组成部分保留了不同层级的空间关系：核心城址承担政治与居住功能，水利系统调节水流，墓地呈现社会等级，玉器则把信仰和身份带入具体器物。",
          ],
        },
        {
          h: "玉器不是‘能量石’",
          p: [
            "良渚玉琮、玉璧和玉钺的制作需要选料、切割、钻孔、抛光和运输。器物在墓葬中的组合与等级差异，是研究权力和礼制的重要材料；把它们称为具有超自然能量，会遮蔽制作工艺与社会关系。",
            "玉器上的神人兽面图像可以进入远古符号档案，但解释必须依赖出土位置、同墓器物和区域比较。相似图案只能提出问题，不能自动证明跨文明同源。",
          ],
        },
        {
          h: "早期国家的可观察指标",
          p: [
            "城墙、功能分区、长距离调运和等级墓葬共同构成早期区域国家的考古指标。良渚案例提醒我们，国家形成不一定以文字档案为前提，水利与空间组织同样能留下可测量的行政能力。",
            "遗址保护仍依赖持续监测、缓冲区管理和公众解释。研究‘史前高级文明’时，最有力的证据往往是这些可复核的基础设施，而不是年代模糊的传说。",
          ],
        },
      ],
    },
    {
      id: "explore-europa-clipper",
      category: "theories",
      section: "深空探测工程卷宗",
      type: "研究",
      year: 2024,
      region: "木星系统 · Europa",
      tags: ["Europa Clipper", "木卫二", "宜居性", "NASA", "深空探测"],
      status: "官方资料",
      evidenceLabel: "任务官方资料",
      title: "Europa Clipper：先判断宜居性，再谈生命",
      subtitle: "EUROPA CLIPPER / HABITABILITY FIRST",
      summary: "NASA 的任务目标是测量木卫二的冰壳、海洋、成分与地质活动，任务本身不是直接探测生命。",
      source: "NASA Science · Europa Clipper",
      sourceOrg: "NASA",
      sourceUrl: "https://science.nasa.gov/mission/europa-clipper/",
      publishedAt: "2024-10-14",
      imageKey: "galaxy",
      facts: {
        "发射日期": "2024-10-14",
        "预计抵达木星": "2030 年",
        "木卫二近掠": "约 49 次",
        "科学载荷": "9 台科学仪器及通信重力实验",
      },
      chapters: [
        {
          h: "任务问题被严格限定",
          p: [
            "NASA 明确说明 Europa Clipper 不是生命探测任务。它要回答的是木卫二是否具备支持生命的环境条件：冰壳厚度如何、地下海洋是否存在并与表面交换、化学成分是否包含关键物质，以及地质活动是否仍在发生。",
            "这种限定很重要。‘可能宜居’是环境判断，‘发现生命’需要独立的生物学证据。把两者混为一谈，会把探测任务的实际产出夸大成结论。",
          ],
        },
        {
          h: "九台仪器如何互相校验",
          p: [
            "磁强计和等离子体仪器通过感应磁场约束海洋的存在、深度和盐度；穿冰雷达探测冰壳内部结构；光谱仪绘制冰、盐和有机物分布；质谱仪分析稀薄大气与可能的羽流；相机和热成像仪则记录地貌与温度异常。",
            "每次近掠都同时运行多种仪器，数据可以交叉比对。单张图像或单个异常谱线不会独自证明海洋生命，只有跨仪器、跨地点和跨时间的重复信号才有解释价值。",
          ],
        },
        {
          h: "到达之前的科学价值",
          p: [
            "任务在 2030 年抵达前，地面研究已经利用 Galileo 数据、哈勃观测和实验室冰化学建立了候选模型。Europa Clipper 的贡献是把模型带到木卫二近旁，用更高分辨率的测量检验它们。",
            "因此，地外文明探索的核心不只是‘有没有外星人’，而是把未知拆成可执行的测量问题：海洋、能量、化学物质、地质交换和时间尺度。",
          ],
        },
      ],
    },
    {
      id: "explore-osiris-rex",
      category: "theories",
      section: "深空探测工程卷宗",
      type: "档案",
      year: 2023,
      region: "近地小行星 Bennu · 美国犹他州",
      tags: ["OSIRIS-REx", "Bennu", "样品返回", "小行星", "NASA"],
      status: "官方资料",
      evidenceLabel: "任务官方资料",
      title: "OSIRIS-REx：把小行星样品带回地球",
      subtitle: "OSIRIS-REx / SAMPLE RETURN",
      summary: "从轨道测绘、短暂接触采样到样品舱回收，记录一次可复核的深空实证工程。",
      source: "NASA Science · OSIRIS-REx FAQ",
      sourceOrg: "NASA",
      sourceUrl: "https://science.nasa.gov/mission/osiris-rex/osiris-rex-faq/",
      publishedAt: "2023-09-24",
      imageKey: "mars",
      facts: {
        "发射日期": "2016-09-08",
        "抵达 Bennu": "2018-12-03",
        "采样日期": "2020-10-20",
        "返回样品": "约 121.6 克岩石与尘埃",
      },
      chapters: [
        {
          h: "样品返回改变证据等级",
          p: [
            "OSIRIS-REx 是美国首个从小行星返回样品的任务。探测器在 Bennu 表面短暂接触，收集岩石和尘埃，样品舱于 2023 年 9 月 24 日在犹他州着陆，随后进入氮气保护的洁净流程。",
            "远程光谱只能告诉我们反射光中可能有哪些成分；样品返回允许实验室直接测量矿物、同位素和有机分子，并把结果交给不同团队复核。",
          ],
        },
        {
          h: "采样点不是‘随便捡一把土’",
          p: [
            "Bennu 表面松散、碎石密集，团队先用相机和光谱仪绘制地形，再从候选区域中选择 Nightingale 采样点。机械臂接触时间只有几秒，喷出的氮气把表层颗粒扰起并导入采样头，整个过程受姿态、导航和接触力约束。",
            "样品舱、封存容器和洁净室都属于证据链的一部分。地外样品研究不仅要说明发现了什么，也要记录污染控制、重量核算和分样流程。",
          ],
        },
        {
          h: "与地外生命问题的关系",
          p: [
            "Bennu 被认为保留了早期太阳系物质，样品可以帮助研究水、碳和有机分子如何在行星形成阶段分布。它不等同于发现生命，也不代表 Bennu 曾经存在文明；它提供的是生命化学起源的环境背景。",
            "把‘有机分子’写成‘有生命’是常见误读。档案阅读应把化学成分、形态结构、生物标志和生命确认分成不同证据层级。",
          ],
        },
      ],
    },
    {
      id: "explore-juice",
      category: "theories",
      section: "深空探测工程卷宗",
      type: "研究",
      year: 2023,
      region: "木星系统 · Ganymede / Callisto / Europa",
      tags: ["JUICE", "ESA", "木星卫星", "海洋世界", "引力辅助"],
      status: "官方资料",
      evidenceLabel: "任务官方资料",
      title: "JUICE：巡访木星的三颗冰卫星",
      subtitle: "JUICE / JUPITER ICY MOONS EXPLORER",
      summary: "ESA 任务以木卫三为最终重点，通过多次引力辅助和近掠比较三颗冰卫星的内部海洋与表面环境。",
      source: "European Space Agency · JUICE",
      sourceOrg: "ESA",
      sourceUrl: "https://www.esa.int/Science_Exploration/Space_Science/Juice",
      publishedAt: "2023-04-14",
      imageKey: "galaxy",
      facts: {
        "发射日期": "2023-04-14",
        "预计抵达木星": "2031 年",
        "目标卫星": "Ganymede、Callisto、Europa",
        "计划近掠": "约 35 次木星卫星飞掠",
      },
      chapters: [
        {
          h: "一次任务，三种比较样本",
          p: [
            "JUICE 将观测木卫三、木卫四和木卫二。三者都可能拥有地下海洋，但冰壳厚度、表面年龄、磁场和潮汐加热不同，比较它们能把‘冰卫星可能宜居’从单点猜想推进到行星系统层面的研究。",
            "ESA 的任务设计同时包含遥感、地球物理和原位环境测量。探测器不会钻入海洋，而是通过磁场、重力、雷达、成像和光谱推断内部结构。",
          ],
        },
        {
          h: "引力辅助是一条可计算的路线",
          p: [
            "从地球飞往木星需要巨大的能量。JUICE 采用月球—地球、金星和地球引力辅助，利用天体运动改变速度和轨道方向。每次飞掠的时刻、距离和姿态都必须满足导航窗口，‘绕路’本身就是工程数据。",
            "任务日历是公开的，但计划可能随着运行状态调整。档案页因此同时保留计划日期和实际事件，避免把任务设计图误读成已经完成的观测。",
          ],
        },
        {
          h: "宜居性不是生命结论",
          p: [
            "JUICE 研究的是液态水、能量来源、化学成分和长期稳定性等宜居条件。即便测量确认地下海洋，也只能说明‘可能支持生命’，不能替代对生物体、代谢或独特生物标志的直接检测。",
            "这类任务让地外文明探索更接近科学实践：先建立环境档案，再决定下一代着陆器或样品返回任务需要测什么。",
          ],
        },
      ],
    },
    {
      id: "theory-great-filter",
      category: "theories",
      section: "地外生命假说",
      type: "研究",
      year: 1998,
      region: "宇宙文明研究",
      tags: ["大过滤器", "费米悖论", "文明演化", "SETI", "假说"],
      status: "理论假说",
      evidenceLabel: "理论框架",
      evidenceNote: "大过滤器是围绕费米悖论提出的思想框架，不是已观测到的宇宙规律。",
      title: "大过滤器：文明为何没有留下可见痕迹？",
      subtitle: "THE GREAT FILTER / A TESTABLE QUESTION",
      summary: "把‘宇宙为什么沉默’拆成生命起源、复杂化、技术文明与长期存续等一连串可能瓶颈。",
      source: "SETI Institute · Fermi Paradox resources",
      sourceOrg: "SETI Institute",
      sourceUrl: "https://www.seti.org/research/seti-101/fermi-paradox/",
      publishedAt: "1998",
      imageKey: "telescope",
      facts: {
        "概念性质": "费米悖论相关思想实验",
        "常见问题": "过滤器位于过去还是未来？",
        "证据状态": "没有独立观测证据",
        "研究用途": "组织搜寻策略与风险讨论",
      },
      chapters: [
        {
          h: "从数量推理到沉默证据",
          p: [
            "大过滤器试图解释一个直觉冲突：恒星和行星数量巨大，若技术文明普遍出现，为什么我们没有看到清晰的工程痕迹、信号或殖民迹象？它把文明路径拆成一系列阶段，而不是直接假定某个外星种族。",
            "候选阶段可以包括生命起源、原核生物到复杂生命、工具使用、工业化和跨恒星扩张。每个阶段的概率都未知，因此模型更像问题清单而不是计算结果。",
          ],
        },
        {
          h: "为什么它不能预测末日",
          p: [
            "如果过滤器在我们身后，意味着某些早期阶段极其罕见；如果过滤器在未来，则可能涉及技术风险、资源约束或文明自我终止。但没有观测数据能把这两种叙事区分开，任何‘人类必然毁灭’的结论都超出证据。",
            "SETI 的实际工作仍然依赖望远镜、频段、候选信号和复核流程。理论框架只有在能改变观测设计、数据解释或风险建模时，才具有研究价值。",
          ],
        },
      ],
    },
    {
      id: "theory-habitable-zone",
      category: "theories",
      section: "星系宜居研究",
      type: "研究",
      year: 2024,
      region: "系外行星研究",
      tags: ["宜居带", "系外行星", "大气", "液态水", "NASA"],
      status: "科学研究",
      evidenceLabel: "观测与模型研究",
      title: "宜居带不是生命带：从轨道距离到行星气候",
      subtitle: "HABITABLE ZONES / CLIMATE CONTEXT",
      summary: "解释恒星宜居带的物理含义，以及为什么轨道位置只能作为筛选条件，不能直接证明行星存在生命。",
      source: "NASA Exoplanet Exploration",
      sourceOrg: "NASA",
      sourceUrl: "https://science.nasa.gov/exoplanets/habitable-zone/",
      publishedAt: "2024",
      imageKey: "galaxy",
      facts: {
        "基本定义": "在特定模型下允许表面存在液态水的轨道区域",
        "关键变量": "恒星光度、大气、反照率、温室效应与地质循环",
        "证据状态": "候选筛选指标",
        "不能推出": "不能单凭轨道距离证明生命",
      },
      chapters: [
        {
          h: "先问‘什么样的水’",
          p: [
            "经典宜居带通常指在给定恒星光度和大气假设下，行星表面可能维持液态水的距离范围。它是气候模型的结果，不是一条在宇宙中实际画出的边界。",
            "同样位于宜居带内的行星，若大气很薄、反照率不同或潮汐锁定，表面环境也可能完全不同。模型的前提必须与观测数据一起报告。",
          ],
        },
        {
          h: "从凌日到光谱",
          p: [
            "凌日法先通过恒星亮度微小下降发现候选行星，再结合轨道周期和恒星半径估算大小。光谱观测可以寻找水蒸气、二氧化碳、甲烷等分子，但云层、噪声和恒星活动会让解释产生退化。",
            "真正的生物标志需要多个分子组合、时间变化和非生物过程排除。‘检测到一个分子’与‘确认生命’之间隔着完整的模型比较和独立复核。",
          ],
        },
      ],
    },
    {
      id: "beings-ariel-school",
      category: "beings",
      section: "外星接触事件",
      type: "档案",
      year: 1994,
      region: "津巴布韦 · Ruwa",
      tags: ["Ariel School", "目击叙述", "儿童证词", "访谈档案", "文化记录"],
      status: "文化叙述",
      evidenceLabel: "访谈与影像记录",
      evidenceNote: "该事件缺少可公开核验的官方原始物证；本条收录目击者访谈、绘画与后续媒体记录，不把叙述当作外星生物学证据。",
      title: "Ariel School：集体目击叙述的形成过程",
      subtitle: "ARIEL SCHOOL / WITNESS ARCHIVE",
      summary: "记录 1994 年津巴布韦 Ruwa 学校儿童的目击叙述，以及访谈时间、绘画材料和传播路径。",
      source: "UAP Research Archive · Ariel School case file",
      sourceOrg: "UAP Research Archive",
      sourceUrl: "https://uaprad.org/cases/ariel-school-incident-1994/",
      publishedAt: "1994-09-16",
      imageKey: "earth",
      facts: {
        "事件日期": "1994-09-16",
        "地点": "Ruwa，津巴布韦",
        "资料形态": "早期访谈、绘画、电视影像与回访",
        "物证状态": "未发现可公开复核的独立物证",
      },
      chapters: [
        {
          h: "先固定当时留下的材料",
          p: [
            "公开档案通常把事件日期记为 1994 年 9 月 16 日。儿童在课间报告看到异常物体和小型人物，随后接受 BBC 记者 Tim Leach、调查者 Cynthia Hind 等人的访谈，并留下绘画与口述记录。",
            "研究这类事件时，访谈距事件发生的时间、提问方式、是否互相讨论过、记录是否完整，和叙述内容本身同样重要。档案页面将不同时间点的材料分开，避免把多年后的回忆倒灌回当天。",
          ],
        },
        {
          h: "相似叙述意味着什么",
          p: [
            "多名证人描述相似，可能提示他们看到了共同刺激，也可能受到共同环境、同伴交流和访谈框架影响。相似性可以提高事件的研究价值，却不能单独确定刺激的物理来源。",
            "目前没有公开的雷达记录、残留物或可重复观测与该事件形成闭合证据链。将其归入文化叙述，是对材料形态的准确描述，而不是对当事人的否定。",
          ],
        },
        {
          h: "外星种族图鉴的边界",
          p: [
            "Ariel School 的‘大眼睛人物’后来与小灰人形象互相影响，成为影视、纪录片和 UFO 社群中的视觉符号。图像传播史可以研究，但不能把媒体中的统一形象反推为真实种族的固定外貌。",
            "本馆保留原始绘画、访谈来源和后续争论，供读者追踪一个叙述如何在不同媒介中被重新组织。",
          ],
        },
      ],
    },
    {
      id: "beings-sleep-paralysis",
      category: "beings",
      section: "人体实验与绑架事件",
      type: "研究",
      year: 2005,
      region: "美国 · 睡眠与记忆研究",
      tags: ["睡眠瘫痪", "催眠回忆", "外星绑架", "记忆研究", "心理学"],
      status: "科学研究",
      evidenceLabel: "同行评议研究",
      title: "睡眠瘫痪与外星绑架记忆：一个可检验的解释路径",
      subtitle: "SLEEP PARALYSIS / MEMORY AND ABDUCTION REPORTS",
      summary: "以 Harvard 研究者的实证研究为入口，区分睡眠体验、记忆确信感和外星解释之间的不同层次。",
      source: "PubMed · McNally & Clancy, 2005",
      sourceOrg: "PubMed / Harvard University",
      sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/15881271/",
      publishedAt: "2005",
      pdfUrl: "https://doi.org/10.1177/1363461505050715",
      imageKey: "earth",
      facts: {
        "研究对象": "报告外星绑架经历并伴随睡眠瘫痪的人群",
        "关键体验": "清醒感、无法移动、入睡或醒来时的幻觉",
        "研究性质": "心理生理与记忆解释研究",
        "结论边界": "不判断外星生命是否存在",
      },
      chapters: [
        {
          h: "睡眠瘫痪是什么",
          p: [
            "睡眠瘫痪发生在快速眼动睡眠的肌肉抑制尚未解除时。人可能已经有清醒感，却暂时无法移动，并把梦境成分、房间轮廓或‘入侵者’体验为现实。体验非常真实，但真实感本身不能决定其外部来源。",
            "McNally 与 Clancy 的研究考察了 10 名把相关经历解释为外星绑架的人，并将其叙述与睡眠瘫痪和醒来时幻觉联系起来。样本量有限，结论应理解为一种解释路径，而不是对所有案例的概括。",
          ],
        },
        {
          h: "记忆不是录像带",
          p: [
            "记忆会在回忆、谈论和接受暗示时重新组织。催眠可能提高叙述的细节和确信感，却不等于提高事实准确率；因此‘回忆得很清楚’不能替代同时期的记录、第三方证词和物证。",
            "研究者还发现，关于创伤或异常经历的信念可以引发与回忆相关的生理反应。生理反应说明经历对当事人有影响，不等同于证明事件按叙述方式发生。",
          ],
        },
        {
          h: "对档案整理的启示",
          p: [
            "外星种族档案需要同时保存当事人的主观体验和可独立核验的外部记录。把两者混在同一栏，会让心理学问题被误读成飞行器或生物学问题。",
            "本条与希尔夫妇、绑架叙述和小灰人视觉史互相链接，读者可以比较不同案例的时间线、记录方式和证据缺口。",
          ],
        },
      ],
    },
    {
      id: "beings-adamski-contactee",
      category: "beings",
      section: "经典外星种族图鉴",
      type: "档案",
      year: 1952,
      region: "美国 · 加利福尼亚",
      tags: ["George Adamski", "接触者运动", "金星人", "文化史", "外星形象"],
      status: "文化叙述",
      evidenceLabel: "接触者出版物",
      evidenceNote: "本条讨论 George Adamski 的出版物与接触者运动史，不把其关于金星访客的声明当作天文学或生物学事实。",
      title: "Adamski 与接触者运动：‘友善访客’的文化模板",
      subtitle: "CONTACTEE MOVEMENT / GEORGE ADAMSKI",
      summary: "追踪 1950 年代接触者叙述如何塑造‘北欧型外星人’与星际伦理话语，并核对其与天文学事实的距离。",
      source: "Encyclopaedia Britannica · George Adamski",
      sourceOrg: "Encyclopaedia Britannica",
      sourceUrl: "https://www.britannica.com/biography/George-Adamski",
      publishedAt: "1952",
      imageKey: "earth",
      facts: {
        "公开活动高峰": "1950 年代",
        "叙述类型": "接触者出版物与演讲",
        "常见形象": "高大、近人类的‘金星访客’",
        "证据状态": "无独立物证支持",
      },
      chapters: [
        {
          h: "从飞碟报告到接触叙事",
          p: [
            "George Adamski 在 1950 年代发表与‘金星人’接触的叙述，声称曾看到飞行器、交流并获得关于人类伦理的讯息。这类故事与当时冷战、核武器恐惧和太空竞赛的社会背景相互呼应。",
            "与强调威胁和绑架的叙述不同，接触者运动常塑造‘友善访客’：外星人拥有更高技术，却通过道德训诫帮助人类。这是一种文化模板，不是可验证的种族分类。",
          ],
        },
        {
          h: "为什么‘北欧型’会出现",
          p: [
            "高大、金发、近人类的外星形象，与 20 世纪科幻杂志、宗教天使图像和大众审美共享视觉资源。不同作者和读者会在传播过程中反复修正外貌，使其逐渐变成稳定类型。",
            "研究形象史时，应记录最早出现的文本、出版媒介、插图来源和后续改编。只列出‘某种族长什么样’，会抹掉形象被制造和传播的过程。",
          ],
        },
        {
          h: "天文学核对",
          p: [
            "金星表面高温高压、缺少适合人类呼吸的环境，这些基础天文学事实与‘金星上存在类似地球文明’的字面说法不相容。科学核对并不需要否认叙述者的文化影响，而是把物理主张与叙事价值分开。",
            "本馆把 Adamski 档案放在文化叙述层，并与小灰人、希尔夫妇和睡眠瘫痪研究交叉阅读，展示外星种族概念如何随时代变化。",
          ],
        },
      ],
    },
    {
      id: "uap-rendlesham",
      category: "uap",
      section: "年度事件卷宗",
      type: "档案",
      year: 1980,
      region: "英国 · 萨福克郡 Rendlesham Forest",
      tags: ["Rendlesham", "英国国防部", "DEFE 24", "军方目击", "UAP"],
      status: "官方资料",
      evidenceLabel: "解密政府档案",
      title: "Rendlesham Forest：一页备忘录与数十年追问",
      subtitle: "RENDLESHAM FOREST / DEFE 24",
      summary: "沿英国国家档案馆的 DEFE 文件，区分军人报告、警方记录、议会询问与后来的口述扩展。",
      source: "UK National Archives · UFO reports",
      sourceOrg: "UK National Archives",
      sourceUrl: "https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/postwar/ufo-reports/",
      publishedAt: "1980-12",
      imageKey: "gofast",
      facts: {
        "事件时间": "1980 年 12 月",
        "地点": "RAF Woodbridge / Rendlesham Forest",
        "核心文件": "DEFE 24/1948/1",
        "官方立场": "未认定对英国空域或国家安全构成威胁",
      },
      chapters: [
        {
          h: "档案里真正保存了什么",
          p: [
            "英国国家档案馆说明，1980 年 12 月 RAF Woodbridge 附近的美军人员报告了森林方向的异常光线，随后有人员在两个夜晚进入森林调查。档案中最核心的是 Charles Halt 的备忘录，以及围绕它产生的内部讨论、警方通信和议会材料。",
            "档案并不是一段完整的现场录像。它保存的是政府如何接收、记录和处理报告的过程。‘有文件’说明事件进入了行政记录，不等于文件已经证明某种飞行器存在。",
          ],
        },
        {
          h: "时间线与替代解释",
          p: [
            "目击者后来把灯塔、流星、卫星再入、农场灯光和森林中的普通物体等纳入解释讨论。不同解释需要对应不同时间点和视线几何，不能只用‘看起来很亮’来互相替代。",
            "国家档案馆的研究指南还指出，许多早期 UFO 文件因当时保存政策而被销毁，现存材料并不完整。缺失记录是档案条件，不应被自动解释为掩盖。",
          ],
        },
        {
          h: "如何继续核查",
          p: [
            "建议先读国家档案馆的事件概览，再按 DEFE 24/1948/1、DEFE 24/2042/1 等目录号追踪文件。把当日记录、后来的访谈和媒体叙事分栏，能看出故事在哪些节点发生了扩展。",
            "本条归入官方资料与年度事件卷宗，‘未解释’只表示在现有公开资料范围内没有唯一结论。",
          ],
        },
      ],
    },
    {
      id: "uap-aguadilla",
      category: "uap",
      section: "官方解密资料",
      type: "研究",
      year: 2025,
      region: "波多黎各 · Aguadilla",
      tags: ["AARO", "Aguadilla", "红外视频", "风速", "UAP调查"],
      status: "官方资料",
      evidenceLabel: "官方案例结论",
      title: "Aguadilla 红外影像：看见移动，不等于看见穿水",
      subtitle: "AARO PUERTO RICO / CASE RESOLUTION",
      summary: "根据 AARO 的案例结论，重新检查视频中的视差、风向和双目标错觉，理解官方影像分析如何排除夸张解释。",
      source: "AARO · Puerto Rico UAP Case Resolution",
      sourceOrg: "AARO",
      sourceUrl: "https://www.aaro.mil/Portals/136/PDFs/case_resolution_reports/AARO_Puerto_Rico_UAP_Case_Resolution.pdf",
      publishedAt: "2025-03-20",
      imageKey: "gofast",
      facts: {
        "视频平台": "美国海关与边境保护局 DHC-8",
        "地点": "Rafael Hernández Airport 附近",
        "分析要点": "热成像、风向、视差与目标分离",
        "报告日期": "2025-03-20",
      },
      chapters: [
        {
          h: "原始视频提出了哪些问题",
          p: [
            "AARO 报告分析了一架美国海关与边境保护局 DHC-8 飞机拍摄的热成像视频。画面中的目标看上去高速移动、接近水面并在中途分成两个亮点，因此长期被描述成‘进入海水后继续飞行’。",
            "但视频只记录了传感器视线方向上的角度变化，没有直接给出目标的三维距离、真实速度或高度。任何运动结论都必须结合飞机航迹、镜头参数和环境风场。",
          ],
        },
        {
          h: "视差如何改变直觉",
          p: [
            "AARO 的案例结论认为，目标以接近风速和风向的方式移动，视频中的快速横向运动主要来自传感器平台自身的飞行和视差。两个亮点也可由两个相互接近的目标解释，而非一个物体穿入水面。",
            "这不是‘把异常都解释成普通物体’，而是展示分析顺序：先校准传感器和平台运动，再比较候选假设。若基础几何未处理，肉眼看到的速度会系统性偏高。",
          ],
        },
        {
          h: "官方结论的边界",
          p: [
            "案例解析并没有识别目标的具体型号，也没有声称所有 UAP 都能用同一机制解释。它只对这一段视频的可见信息给出最符合数据的解释。",
            "本条适合与 GOFAST、Tic Tac 和 NASA UAP 报告并读：同样是‘未识别’，证据类型和结论强度可以完全不同。",
          ],
        },
      ],
    },
    {
      id: "uap-tehran-1976",
      category: "uap",
      section: "年度事件卷宗",
      type: "档案",
      year: 1976,
      region: "伊朗 · 德黑兰",
      tags: ["德黑兰事件", "伊朗空军", "雷达", "CIA", "NSA档案"],
      status: "官方资料",
      evidenceLabel: "解密政府通信",
      title: "1976 德黑兰空中事件：雷达、拦截与文件链",
      subtitle: "TEHRAN 1976 / DECLASSIFIED REPORT",
      summary: "从美国国家安全局公开的联合参谋部报告出发，分离飞行员叙述、雷达信息与后来的二手重述。",
      source: "National Security Agency · FOIA release",
      sourceOrg: "NSA",
      sourceUrl: "https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/FOIA-Reports-and-Releases/FOIA-Reports-and-Releases-List/igphoto/2002761354/",
      publishedAt: "1976-09-19",
      imageKey: "telescope",
      facts: {
        "事件日期": "1976-09-19",
        "地点": "伊朗德黑兰上空",
        "涉及平台": "伊朗空军 F-4 拦截机",
        "档案性质": "联合参谋部报告的解密副本",
      },
      chapters: [
        {
          h: "从夜间电话到情报报告",
          p: [
            "公开文件描述，德黑兰居民和伊朗空军人员报告了夜空中的明亮目标，随后有 F-4 试图接近。文件进入美国情报与国防系统后，成为一份关于外国空军报告的情报材料，而不是一次由美国机构亲自现场调查的实验。",
            "因此，档案中的每个句子都要标明来源层级：哪些来自飞行员，哪些来自调度员，哪些是撰写者对伊朗报告的转述。",
          ],
        },
        {
          h: "雷达与视觉并不自动互相证明",
          p: [
            "雷达回波、目视亮光和通信记录各自有误差来源。雷达可能受到杂波、设备状态和识别程序影响；目视判断受到夜间距离、亮度和背景影响。只有时间同步、航迹和原始数据足够完整时，三者才可以进行定量交叉检验。",
            "现有公开报告提供了重要的历史记录，但并未给出可供现代研究者重新处理的完整原始雷达数据。‘同时出现’应与‘已证实为同一目标’区分。",
          ],
        },
        {
          h: "为什么值得归档",
          p: [
            "德黑兰事件显示冷战时期的 UAP 报告如何在军事安全语境中流转，也让读者看到解密文件的价值和局限：它能还原机构处理流程，却未必能还原现场的全部物理条件。",
            "本条与 Rendlesham、Project Blue Book 和 AARO 案例共同构成官方档案链，帮助比较不同国家、不同年代的记录制度。",
          ],
        },
      ],
    },
  ];

  window.ARCHIVE_DATA = (window.ARCHIVE_DATA || []).concat(supplement.map(makeRecord));
})();
