import { FetchClient, Config } from 'coze-coding-dev-sdk';
import * as fs from 'fs';

async function parsePDF() {
  const pdfUrl = 'https://coze-coding-project.tos.coze.site/create_attachment/2026-03-23/3349588293727332_ac3a36073725011df954e42063e9aff7_5VO787W9K1.pdf?sign=4896322473-b87cf07793-0-8196dbfab451ba1f0ab9c8e8e50da3e80cea084006f1d5f2b0c98be8f400b6dc';
  
  console.log('开始解析PDF...');
  
  const config = new Config();
  const client = new FetchClient(config);
  
  try {
    const response = await client.fetch(pdfUrl);
    
    console.log('PDF解析结果:');
    console.log('标题:', response.title);
    console.log('状态:', response.status_code === 0 ? '成功' : '失败');
    console.log('文件类型:', response.filetype);
    console.log('内容项数量:', response.content.length);
    
    // 提取所有文本内容
    const textContent = response.content
      .filter(item => item.type === 'text' && item.text)
      .map(item => item.text)
      .join('\n\n');
    
    // 创建Markdown内容
    let markdown = `# ${response.title || 'PDF小说解析'}\n\n`;
    markdown += `**来源**: ${response.url || pdfUrl}\n\n`;
    markdown += `**发布时间**: ${response.publish_time || '未知'}\n\n`;
    markdown += `---\n\n`;
    markdown += `## 正文\n\n`;
    markdown += textContent;
    
    // 保存到文件
    const outputPath = '/workspace/projects/novel-content.md';
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    
    console.log('\n内容已保存到:', outputPath);
    console.log('文本总长度:', textContent.length, '字符');
    
    return {
      title: response.title,
      content: textContent,
      filepath: outputPath
    };
  } catch (error) {
    console.error('解析失败:', error);
    throw error;
  }
}

parsePDF();
