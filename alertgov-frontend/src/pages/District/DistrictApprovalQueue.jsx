import { useState } from 'react';
import { useIncidents } from '../../context/LiveContext';
import { Card, SeverityBadge, StatusBadge, CategoryBadge, AIPanel } from '../../components/common/UIComponents';
import { CheckCircle, AlertTriangle, ArrowRight, ShieldAlert, Truck, Radio, Bot, Zap, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Swal from 'sweetalert2';

export default function DistrictApprovalQueue() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const myIncidents = useIncidents();
  const queue = myIncidents.filter(i => i.status === 'Taluk Verified' || i.status === 'Waiting for Collector');
  const [selectedId, setSelectedId] = useState(queue[0]?.id);
  
  const inc = queue.find(i => i.id === selectedId) || queue[0];
  const selectedIdx = queue.findIndex(i => i.id === inc?.id);

  const handleAction = async (action) => {
    if (action === 'coordinate') {
      navigate('/district/resource-command');
    } else if (action === 'escalate') {
      try {
        if (inc && inc.id && !inc.id.includes('NEW')) {
          const { IncidentService } = await import('../../api');
          await IncidentService.updateIncidentStatus(inc.id, 'Waiting for Collector', 'collector');
        }
        Swal.fire(t('Escalated', 'மேல்முறையீடு செய்யப்பட்டது'), t('Drafted Broadcast & Resources. Forwarded to Collector for Final Approval.', 'ஒளிபரப்பு மற்றும் வளங்கள் வரையப்பட்டன. இறுதி ஒப்புதலுக்காக ஆட்சியருக்கு அனுப்பப்பட்டது.'), 'success').then(() => {
          if (selectedIdx < queue.length - 1) setSelectedIdx(s => s + 1);
          else navigate('/district');
        });
      } catch (e) {
        console.error(e);
        Swal.fire('Error', 'Failed to update status on server.', 'error');
      }
    } else if (action === 'approve_direct') {
      try {
        if (inc && inc.id && !inc.id.includes('NEW')) {
          const { IncidentService } = await import('../../api');
          await IncidentService.updateIncidentStatus(inc.id, 'District Coordinated', 'district');
        }
        Swal.fire(t('Deployed!', 'பயன்படுத்தப்பட்டது!'), t('Broadcast & Resources Deployed!', 'ஒளிபரப்பு மற்றும் வளங்கள் பயன்படுத்தப்பட்டன!'), 'success').then(() => {
          if (selectedIdx < queue.length - 1) setSelectedIdx(s => s + 1);
          else navigate('/district');
        });
      } catch (e) {
        console.error(e);
        Swal.fire('Error', 'Failed to update status on server.', 'error');
      }
    }
  };

  if (!inc) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <CheckCircle size={48} color="var(--severity-low)" style={{ marginBottom: '16px' }} />
        <h2>{t('Queue Empty', 'வரிசை காலியாக உள்ளது')}</h2>
        <p>{t('No incidents are waiting for District Coordination right now.', 'தற்போது மாவட்ட ஒருங்கிணைப்புக்காக எந்த சம்பவங்களும் காத்திருக்கவில்லை.')}</p>
      </div>
    );
  }

  const isSevere = ['High', 'Severe', 'Extremely Severe'].includes(inc.severity);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title"><ClipboardList size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('District Approval Queue', 'மாவட்ட ஒப்புதல் வரிசை')}</div>
          <div className="page-subtitle">{t('Coordinate resources and broadcasts for Taluk-verified incidents', 'தாலுகாவால் சரிபார்க்கப்பட்ட சம்பவங்களுக்கான வளங்கள் மற்றும் ஒளிபரப்புகளை ஒருங்கிணைக்கவும்')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
            {t('Queue:', 'வரிசை:')} {selectedIdx + 1} {t('of', 'இல்')} {queue.length}
          </span>
        </div>
      </div>

      <div className="grid-3">
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>{inc.title}</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="font-mono badge badge-gray">{inc.id}</span>
                  <CategoryBadge category={inc.category} />
                  <SeverityBadge severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', background: 'var(--bg-muted)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div className="text-xs text-muted font-bold text-uppercase">{t('Reported By', 'அறிக்கையாளர்')}</div>
                <div className="text-sm font-bold">{inc.reportedBy} ({t('Village', 'கிராமம்')})</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
                <div className="text-xs text-muted font-bold text-uppercase">{t('Verified By', 'சரிபார்த்தவர்')}</div>
                <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>TAL2104 ({t('Taluk', 'தாலுகா')})</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
                <div className="text-xs text-muted font-bold text-uppercase">{t('Taluk Note', 'தாலுகா குறிப்பு')}</div>
                <div className="text-sm">"{inc.talukofficerNote || t('Verified authentic.', 'உண்மையானது என சரிபார்க்கப்பட்டது.')}"</div>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{inc.description}</p>
          </Card>

          <Card title={<><Bot size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('AI Escalation Recommendation', 'செயற்கை நுண்ணறிவு மேல்முறையீட்டு பரிந்துரை')}</>}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: isSevere ? 'var(--severity-severe)' : 'var(--severity-low)', marginBottom: '8px' }}>
                  {isSevere ? t('Collector Approval Required', 'ஆட்சியரின் ஒப்புதல் தேவை') : t('District Level Approval Permitted', 'மாவட்ட அளவிலான ஒப்புதல் அனுமதிக்கப்படுகிறது')}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {inc.aiRecommendation ? (
                    inc.aiRecommendation
                  ) : (
                    isSevere
                      ? t("Due to high severity, chemical proximity, and high population risk, this incident cannot be broadcasted without the District Collector's executive approval. Prepare the resource plan and draft broadcast, then forward.", "அதிக தீவிரம், இரசாயன அருகாமை மற்றும் அதிக மக்கள் தொகை ஆபத்து காரணமாக, மாவட்ட ஆட்சியரின் நிர்வாக ஒப்புதல் இல்லாமல் இந்த சம்பவத்தை ஒளிபரப்ப முடியாது. வளத் திட்டம் மற்றும் ஒளிபரப்பு வரைவை தயார் செய்து, பின்னர் அனுப்பவும்.")
                      : t("Low severity incident. District EOC is authorized to approve cell broadcasts and assign resources directly without Collector escalation.", "குறைந்த தீவிர சம்பவம். ஆட்சியருக்கு அனுப்பாமல் நேரடியாக செல் ஒளிபரப்புகளை அங்கீகரிக்கவும் வளங்களை ஒதுக்கவும் மாவட்ட அவசரகால மையத்திற்கு அதிகாரம் உள்ளது.")
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card title={<><Zap size="1.2em" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {t('Required Actions', 'தேவையான செயல்கள்')}</>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn btn-primary" style={{ justifyContent: 'space-between' }} onClick={() => handleAction('coordinate')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={16} /> 1. {t('Assign Resources', 'வளங்களை ஒதுக்கவும்')}</span>
                <ArrowRight size={14} />
              </button>

              <button className="btn btn-primary" style={{ justifyContent: 'space-between' }} onClick={() => navigate('/district/alert-broadcast')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Radio size={16} /> 2. {t('Prepare Broadcast', 'ஒளிபரப்பை தயார் செய்யவும்')}</span>
                <ArrowRight size={14} />
              </button>

              <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />

              {isSevere ? (
                <button className="btn btn-warning" style={{ justifyContent: 'center' }} onClick={() => handleAction('escalate')}>
                  <ShieldAlert size={16} /> {t('Forward to Collector', 'ஆட்சியருக்கு அனுப்பவும்')}
                </button>
              ) : (
                <button className="btn btn-success" style={{ justifyContent: 'center' }} onClick={() => handleAction('approve_direct')}>
                  <CheckCircle size={16} /> {t('Approve & Deploy Directly', 'நேரடியாக ஒப்புதல் அளித்து பயன்படுத்தவும்')}
                </button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
