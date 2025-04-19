import React from 'react';
import { ExternalLink } from 'lucide-react';
import { MarketingContent } from '../../types';
import Badge from '../common/Badge';

interface MarketingContentCardProps {
  content: MarketingContent;
}

const MarketingContentCard: React.FC<MarketingContentCardProps> = ({ content }) => {
  const getTypeIcon = () => {
    switch (content.type) {
      case 'article':
        return '📄';
      case 'post':
        return '💬';
      case 'video':
        return '📹';
      case 'podcast':
        return '🎙️';
      default:
        return '📄';
    }
  };

  const getSentimentColor = () => {
    if (!content.sentimentScore) return 'bg-neutral-200';
    if (content.sentimentScore > 0.5) return 'bg-success-500';
    if (content.sentimentScore < 0) return 'bg-red-500';
    return 'bg-amber-500';
  };

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      <div className="px-4 py-3 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2 text-lg">{getTypeIcon()}</span>
          <span className="text-xs font-medium text-neutral-500">{content.source}</span>
        </div>
        {content.sentimentScore !== undefined && (
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${getSentimentColor()} mr-1`}></div>
            <span className="text-xs text-neutral-500">
              Sentiment: {(content.sentimentScore * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-text">{content.title}</h3>
        <p className="mt-2 text-xs text-neutral-600 line-clamp-2">{content.summary}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {content.keywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="neutral" size="sm">
              {keyword}
            </Badge>
          ))}
          {content.keywords.length > 3 && (
            <span className="text-xs text-neutral-500">+{content.keywords.length - 3}</span>
          )}
        </div>
      </div>
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
        <span className="text-xs text-neutral-500">{content.publishedDate}</span>
        <a 
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600"
          aria-label="View content"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default MarketingContentCard;