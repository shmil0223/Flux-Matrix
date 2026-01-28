
import { Problem, TreeNode } from './types';

export const MOCK_PROBLEMS: Record<string, Problem> = {
  // --- 线性代数 ---
  'p1': {
    id: 'p1',
    title: '正交对角化标准步骤',
    subject: '线性代数',
    difficulty: 'hard',
    timeAgo: '2小时前',
    tags: ['矩阵', '特征向量', '谱定理'],
  },
  'p3': {
    id: 'p3',
    title: '特征值计算易错点',
    subject: '线性代数',
    difficulty: 'easy',
    timeAgo: '昨天',
    tags: ['矩阵', '计算'],
  },
  'p6': {
    id: 'p6',
    title: '矩阵乘法的结合律证明',
    subject: '线性代数',
    difficulty: 'medium',
    timeAgo: '3天前',
    tags: ['矩阵运算', '证明'],
  },
  'p7': {
    id: 'p7',
    title: '秩-零化度定理应用',
    subject: '线性代数',
    difficulty: 'hard',
    timeAgo: '1周前',
    tags: ['线性空间', '维数'],
  },
  'p8': {
    id: 'p8',
    title: 'SVD奇异值分解步骤',
    subject: '线性代数',
    difficulty: 'hard',
    timeAgo: '2周前',
    tags: ['矩阵分解', '应用'],
  },

  // --- 宏观经济学 ---
  'p2': {
    id: 'p2',
    title: '凯恩斯交叉模型推导',
    subject: '宏观经济学',
    difficulty: 'medium',
    timeAgo: '5小时前',
    tags: ['宏观', '模型'],
  },
  'p9': {
    id: 'p9',
    title: 'IS-LM 模型均衡点移动',
    subject: '宏观经济学',
    difficulty: 'hard',
    timeAgo: '1天前',
    tags: ['IS-LM', '政策分析'],
  },
  'p10': {
    id: 'p10',
    title: 'GDP 三种核算方法辨析',
    subject: '宏观经济学',
    difficulty: 'easy',
    timeAgo: '3天前',
    tags: ['国民收入', '概念'],
  },

  // --- 计算机科学 ---
  'p11': {
    id: 'p11',
    title: '快速排序时间复杂度分析',
    subject: '计算机科学',
    difficulty: 'medium',
    timeAgo: '12小时前',
    tags: ['算法', '排序'],
  },
  'p12': {
    id: 'p12',
    title: '二叉树的非递归遍历',
    subject: '计算机科学',
    difficulty: 'medium',
    timeAgo: '2天前',
    tags: ['数据结构', '树'],
  },
  'p13': {
    id: 'p13',
    title: '0/1 背包问题动态规划',
    subject: '计算机科学',
    difficulty: 'hard',
    timeAgo: '5天前',
    tags: ['算法', 'DP'],
  },
  'p14': {
    id: 'p14',
    title: 'TCP 三次握手状态机',
    subject: '计算机科学',
    difficulty: 'medium',
    timeAgo: '1周前',
    tags: ['网络', '协议'],
  },
  'p19': {
    id: 'p19',
    title: '死锁产生的四个必要条件',
    subject: '计算机科学',
    difficulty: 'easy',
    timeAgo: '2周前',
    tags: ['操作系统', '并发'],
  },

  // --- 微积分 ---
  'p4': {
    id: 'p4',
    title: '分部积分法练习',
    subject: '微积分',
    difficulty: 'medium',
    timeAgo: '2天前',
    tags: ['积分', '计算'],
  },
  'p15': {
    id: 'p15',
    title: '洛必达法则适用条件',
    subject: '微积分',
    difficulty: 'easy',
    timeAgo: '4天前',
    tags: ['极限', '导数'],
  },
  'p16': {
    id: 'p16',
    title: '泰勒级数展开：sin(x)',
    subject: '微积分',
    difficulty: 'medium',
    timeAgo: '6天前',
    tags: ['级数', '近似'],
  },

  // --- 概率论与统计 ---
  'p5': {
    id: 'p5',
    title: '贝叶斯定理应用',
    subject: '概率论',
    difficulty: 'hard',
    timeAgo: '3天前',
    tags: ['概率', '统计'],
  },
  'p20': {
    id: 'p20',
    title: '大数定律与中心极限定理',
    subject: '概率论',
    difficulty: 'medium',
    timeAgo: '1周前',
    tags: ['定理', '统计'],
  },

  // --- 大学物理 ---
  'p17': {
    id: 'p17',
    title: '牛顿第二定律的微分形式',
    subject: '大学物理',
    difficulty: 'medium',
    timeAgo: '3天前',
    tags: ['力学', '动力学'],
  },
  'p18': {
    id: 'p18',
    title: '简谐运动能量守恒推导',
    subject: '大学物理',
    difficulty: 'easy',
    timeAgo: '5天前',
    tags: ['振动', '能量'],
  }
};

export const INITIAL_TREE_DATA: TreeNode[] = [
  {
    id: 'root-1',
    title: '线性代数',
    type: 'folder',
    children: [
      {
        id: 'ch-1-0',
        title: '第二章：矩阵运算',
        type: 'folder',
        children: [
           { id: 'node-p6', title: '矩阵乘法的结合律证明', type: 'file', problemId: 'p6' },
        ]
      },
      {
        id: 'ch-1-1',
        title: '第五章：特征值与特征向量',
        type: 'folder',
        children: [
          { id: 'node-p1', title: '正交对角化标准步骤', type: 'file', problemId: 'p1' },
          { id: 'node-p3', title: '特征值计算易错点', type: 'file', problemId: 'p3' },
        ]
      },
      {
        id: 'ch-1-2',
        title: '第六章：内积空间',
        type: 'folder',
        children: [
           { id: 'node-p7', title: '秩-零化度定理应用', type: 'file', problemId: 'p7' },
           { id: 'node-p8', title: 'SVD奇异值分解步骤', type: 'file', problemId: 'p8' },
        ]
      }
    ]
  },
  {
    id: 'root-2',
    title: '宏观经济学',
    type: 'folder',
    children: [
      {
        id: 'ch-2-1',
        title: '第三章：国民收入决定',
        type: 'folder',
        children: [
          { id: 'node-p2', title: '凯恩斯交叉模型推导', type: 'file', problemId: 'p2' },
          { id: 'node-p10', title: 'GDP 三种核算方法辨析', type: 'file', problemId: 'p10' },
        ]
      },
      {
          id: 'ch-2-2',
          title: '第五章：IS-LM 模型',
          type: 'folder',
          children: [
              { id: 'node-p9', title: 'IS-LM 模型均衡点移动', type: 'file', problemId: 'p9' }
          ]
      }
    ]
  },
  {
    id: 'root-3',
    title: '计算机科学',
    type: 'folder',
    children: [
       {
        id: 'ch-3-1',
        title: '数据结构与算法',
        type: 'folder',
        children: [
            { id: 'sub-3-1-1', title: '排序算法', type: 'folder', children: [
                 { id: 'node-p11', title: '快速排序时间复杂度分析', type: 'file', problemId: 'p11' }
            ]},
            { id: 'sub-3-1-2', title: '树与图', type: 'folder', children: [
                 { id: 'node-p12', title: '二叉树的非递归遍历', type: 'file', problemId: 'p12' }
            ]},
            { id: 'sub-3-1-3', title: '动态规划', type: 'folder', children: [
                 { id: 'node-p13', title: '0/1 背包问题动态规划', type: 'file', problemId: 'p13' }
            ]}
        ]
       },
       {
           id: 'ch-3-2',
           title: '计算机网络',
           type: 'folder',
           children: [
               { id: 'node-p14', title: 'TCP 三次握手状态机', type: 'file', problemId: 'p14' }
           ]
       },
       {
           id: 'ch-3-3',
           title: '操作系统',
           type: 'folder',
           children: [
               { id: 'node-p19', title: '死锁产生的四个必要条件', type: 'file', problemId: 'p19' }
           ]
       }
    ]
  },
  {
      id: 'root-4',
      title: '微积分',
      type: 'folder',
      children: [
          {
              id: 'ch-4-1',
              title: '导数与微分',
              type: 'folder',
              children: [
                  { id: 'node-p15', title: '洛必达法则适用条件', type: 'file', problemId: 'p15' }
              ]
          },
          {
              id: 'ch-4-2',
              title: '不定积分',
              type: 'folder',
              children: [
                  { id: 'node-p4', title: '分部积分法练习', type: 'file', problemId: 'p4'}
              ]
          },
          {
              id: 'ch-4-3',
              title: '无穷级数',
              type: 'folder',
              children: [
                   { id: 'node-p16', title: '泰勒级数展开：sin(x)', type: 'file', problemId: 'p16' }
              ]
          }
      ]
  },
  {
      id: 'root-5',
      title: '概率论与数理统计',
      type: 'folder',
      children: [
          { id: 'node-p5', title: '贝叶斯定理应用', type: 'file', problemId: 'p5' },
          { id: 'node-p20', title: '大数定律与中心极限定理', type: 'file', problemId: 'p20' }
      ]
  },
  {
      id: 'root-6',
      title: '大学物理',
      type: 'folder',
      children: [
          {
              id: 'ch-6-1',
              title: '力学',
              type: 'folder',
              children: [
                  { id: 'node-p17', title: '牛顿第二定律的微分形式', type: 'file', problemId: 'p17' },
                  { id: 'node-p18', title: '简谐运动能量守恒推导', type: 'file', problemId: 'p18' }
              ]
          }
      ]
  }
];
