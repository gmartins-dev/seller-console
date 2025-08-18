import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { LoadingOverlay } from '@/components/ui/loading-state';
import { ConvertLeadDialog } from '@/components/opportunities/convert-lead-dialog';
import {
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Target,
  Save,
  X,
  ExternalLink,
} from 'lucide-react';
import { useUpdateLeadMutation } from '@/lib/queries';
import { useErrorHandler } from '@/lib/queries';
import type { Lead } from '@/types';
import { LeadStatusEnum } from '@/types';

interface LeadDetailPanelProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const leadUpdateSchema = z.object({
  status: LeadStatusEnum,
  email: z.string().email('Please enter a valid email address'),
});

type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;

export function LeadDetailPanel({ lead, open, onClose }: LeadDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConvertDialog, setShowConvertDialog] = useState(false);

  const updateLeadMutation = useUpdateLeadMutation();
  const { handleError } = useErrorHandler();

  const form = useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      status: lead?.status || 'new',
      email: lead?.email || '',
    },
  });

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      form.reset({
        status: lead.status,
        email: lead.email,
      });
      setIsEditing(false);
    }
  }, [lead, form]);

  const onSubmit = async (data: LeadUpdateFormData) => {
    if (!lead) return;

    try {
      await updateLeadMutation.mutateAsync({
        id: lead.id,
        updates: data,
      });
      setIsEditing(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    if (lead) {
      form.reset({
        status: lead.status,
        email: lead.email,
      });
    }
    setIsEditing(false);
  };

  const canConvert = lead && ['new', 'contacted', 'qualified'].includes(lead.status);

  if (!lead) return null;

  const statusConfig = {
    new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
    contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    qualified: { label: 'Qualified', color: 'bg-green-100 text-green-800' },
    unqualified: { label: 'Unqualified', color: 'bg-gray-100 text-gray-800' },
    lost: { label: 'Lost', color: 'bg-red-100 text-red-800' },
  };

  const sourceConfig = {
    website: { label: 'Website', icon: <ExternalLink className="w-4 h-4" /> },
    referral: { label: 'Referral', icon: <User className="w-4 h-4" /> },
    social: { label: 'Social Media', icon: <ExternalLink className="w-4 h-4" /> },
    email: { label: 'Email Campaign', icon: <Mail className="w-4 h-4" /> },
    phone: { label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
    other: { label: 'Other', icon: <ExternalLink className="w-4 h-4" /> },
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
          <LoadingOverlay isLoading={updateLeadMutation.isPending}>
            <SheetHeader className="p-6 pb-4">
              <SheetTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Lead Details
              </SheetTitle>
              <SheetDescription>
                View and edit lead information. Convert qualified leads to opportunities.
              </SheetDescription>
            </SheetHeader>

            <div className="px-6 space-y-6 pb-6">
              {/* Lead Basic Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{lead.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    {lead.company}
                  </div>
                </div>

                {/* Score and Source */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Score:</span>
                    <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {sourceConfig[lead.source].icon}
                    <span className="text-sm">{sourceConfig[lead.source].label}</span>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div>Created</div>
                      <div className="font-medium">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <div>Updated</div>
                      <div className="font-medium">
                        {lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Editable Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Contact Information</h4>
                    {!isEditing ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                        <Button type="submit" size="sm">
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder="email@example.com"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(statusConfig).map(([value, config]) => (
                                  <SelectItem key={value} value={value}>
                                    {config.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Badge className={statusConfig[field.value].color}>
                                {statusConfig[field.value].label}
                              </Badge>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Actions</h4>

                <Button
                  onClick={() => setShowConvertDialog(true)}
                  disabled={!canConvert}
                  className="w-full"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Convert to Opportunity
                </Button>

                {!canConvert && (
                  <p className="text-xs text-muted-foreground">
                    Only new, contacted, or qualified leads can be converted to opportunities.
                  </p>
                )}
              </div>
            </div>
          </LoadingOverlay>
        </SheetContent>
      </Sheet>

      {/* Convert Lead Dialog */}
      <ConvertLeadDialog
        lead={lead}
        open={showConvertDialog}
        onOpenChange={setShowConvertDialog}
        onSuccess={() => {
          setShowConvertDialog(false);
          onClose();
        }}
      />
    </>
  );
}
