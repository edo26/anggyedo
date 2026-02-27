/**
 * CMS Dashboard Component - The main admin interface for managing content.
 * Following the Open/Closed Principle (OCP), each section editor is a
 * self-contained panel that can be extended without modifying others.
 * 
 * This dashboard allows admins to:
 * 1. Edit Navbar content (logo, links, CTA)
 * 2. Edit Hero section (name, title, description, social links)
 * 3. Edit Professional Experiences (add/remove/edit entries)
 * 4. Edit Skills section (categories and individual skills)
 * 5. Edit CTA section (title, description, button)
 * 6. Edit Footer content
 * 7. Configure Google Apps Script backend settings
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Save, Settings, Navigation, Layout, Briefcase,
    Code2, MessageSquare, FileText, ChevronRight, Plus,
    Trash2, Loader2, CheckCircle2, AlertCircle, ExternalLink,
    Database, LayoutGrid
} from 'lucide-react';
import { authService } from '@/services/authService';
import { DEFAULT_CONTENT, GAS_CONFIG_KEY } from '@/lib/constants';
import type {
    PageContent, NavLink, SocialLink, ExperienceEntry,
    SkillCategory, SkillItem, GASConfig, ProjectItem
} from '@/types/content';

// This interface defines the props for the CMSDashboard component
interface CMSDashboardProps {
    onLogout: () => void;
}

// This type defines the available sidebar menu items  
type MenuSection = 'navbar' | 'hero' | 'experiences' | 'projects' | 'skills' | 'cta' | 'footer' | 'settings';

/**
 * This component renders the full CMS dashboard interface.
 * Features: sidebar navigation, section-specific editors, save/discard,
 * GAS configuration panel, and real-time form validation.
 */
export default function CMSDashboard({ onLogout }: CMSDashboardProps) {
    const [activeSection, setActiveSection] = useState<MenuSection>('navbar');
    const [content, setContent] = useState<PageContent>(DEFAULT_CONTENT);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [gasConfig, setGasConfig] = useState<GASConfig>({ scriptUrl: '', sheetId: '' });

    // This effect loads saved content and GAS config on mount
    useEffect(() => {
        try {
            const savedContent = localStorage.getItem('anggyedo_content');
            if (savedContent) {
                const parsed = JSON.parse(savedContent);
                // Ensure projects exists for backwards compatibility
                if (!parsed.projects) {
                    parsed.projects = DEFAULT_CONTENT.projects;
                }
                setContent(parsed);
            }
            const savedConfig = localStorage.getItem(GAS_CONFIG_KEY);
            if (savedConfig) {
                setGasConfig(JSON.parse(savedConfig));
            }
        } catch {
            console.warn('Failed to load saved content');
        }
    }, []);

    /**
     * This function saves the current content to localStorage and optionally to GAS.
     * Handles both local persistence and remote sync.
     */
    const handleSave = useCallback(async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            // Save to localStorage as local backup
            localStorage.setItem('anggyedo_content', JSON.stringify(content));

            // If GAS is configured, sync to Google Sheets
            if (gasConfig.scriptUrl) {
                const response = await fetch(gasConfig.scriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'update', data: content }),
                });
                if (!response.ok) {
                    throw new Error('Failed to sync with Google Sheets');
                }
            }

            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error('Save error:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } finally {
            setIsSaving(false);
        }
    }, [content, gasConfig.scriptUrl]);

    /**
     * This function saves the GAS configuration to localStorage.
     */
    const handleSaveGASConfig = () => {
        authService.saveGASConfig(gasConfig);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    /**
     * This function handles the admin logout process.
     */
    const handleLogout = () => {
        authService.logout();
        onLogout();
    };

    // This defines the sidebar menu items with their icons and labels
    const menuItems: { key: MenuSection; label: string; icon: React.ReactNode }[] = [
        { key: 'navbar', label: 'Navbar', icon: <Navigation className="w-4 h-4" /> },
        { key: 'hero', label: 'Hero Section', icon: <Layout className="w-4 h-4" /> },
        { key: 'experiences', label: 'Experiences', icon: <Briefcase className="w-4 h-4" /> },
        { key: 'projects', label: 'Projects', icon: <LayoutGrid className="w-4 h-4" /> },
        { key: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
        { key: 'cta', label: 'CTA Section', icon: <MessageSquare className="w-4 h-4" /> },
        { key: 'footer', label: 'Footer', icon: <FileText className="w-4 h-4" /> },
        { key: 'settings', label: 'GAS Settings', icon: <Database className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full">
                {/* Sidebar Header */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                        <div className="bg-teal-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                            A
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white text-sm">CMS Dashboard</h2>
                            <p className="text-xs text-slate-500">Content Manager</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === item.key
                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            {activeSection === item.key && (
                                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Site</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Top Bar */}
                <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                            {activeSection === 'settings' ? 'Google Apps Script Settings' : `Edit ${activeSection}`}
                        </h1>
                        <div className="flex items-center space-x-3">
                            {/* Save Status Indicator */}
                            <AnimatePresence>
                                {saveStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center space-x-1 text-green-500 text-sm"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Saved!</span>
                                    </motion.div>
                                )}
                                {saveStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center space-x-1 text-red-500 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Save failed</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={activeSection === 'settings' ? handleSaveGASConfig : handleSave}
                                disabled={isSaving}
                                className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Editors */}
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeSection === 'navbar' && (
                                <NavbarEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'hero' && (
                                <HeroEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'experiences' && (
                                <ExperiencesEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'projects' && (
                                <ProjectsEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'skills' && (
                                <SkillsEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'cta' && (
                                <CTAEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'footer' && (
                                <FooterEditor content={content} setContent={setContent} />
                            )}
                            {activeSection === 'settings' && (
                                <GASSettings config={gasConfig} setConfig={setGasConfig} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

// ===== SECTION EDITORS =====
// Each editor component follows Single Responsibility Principle

// This interface defines shared props for section editor components
interface EditorProps {
    content: PageContent;
    setContent: React.Dispatch<React.SetStateAction<PageContent>>;
}

/**
 * This component handles editing of navbar content.
 * Allows changing logo, navigation links, and CTA button.
 */
function NavbarEditor({ content, setContent }: EditorProps) {
    const { navbar } = content;

    // This function updates a specific navbar field
    const updateField = (field: keyof typeof navbar, value: string) => {
        setContent((prev) => ({
            ...prev,
            navbar: { ...prev.navbar, [field]: value },
        }));
    };

    // This function updates a navigation link
    const updateLink = (index: number, field: keyof NavLink, value: string) => {
        setContent((prev) => {
            const links = [...prev.navbar.links];
            links[index] = { ...links[index], [field]: value };
            return { ...prev, navbar: { ...prev.navbar, links } };
        });
    };

    // This function adds a new navigation link
    const addLink = () => {
        setContent((prev) => ({
            ...prev,
            navbar: {
                ...prev.navbar,
                links: [...prev.navbar.links, { label: 'New Link', href: '#new' }],
            },
        }));
    };

    // This function removes a navigation link by index
    const removeLink = (index: number) => {
        setContent((prev) => ({
            ...prev,
            navbar: {
                ...prev.navbar,
                links: prev.navbar.links.filter((_, i) => i !== index),
            },
        }));
    };

    return (
        <div className="space-y-6">
            <EditorCard title="Logo">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Logo Letter" value={navbar.logo} onChange={(v) => updateField('logo', v)} />
                    <InputField label="Logo Text" value={navbar.logoAccent} onChange={(v) => updateField('logoAccent', v)} />
                </div>
            </EditorCard>

            <EditorCard title="Navigation Links">
                <div className="space-y-3">
                    {navbar.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <InputField label="Label" value={link.label} onChange={(v) => updateLink(index, 'label', v)} className="flex-1" />
                            <InputField label="Href" value={link.href} onChange={(v) => updateLink(index, 'href', v)} className="flex-1" />
                            <button onClick={() => removeLink(index)} className="mt-5 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button onClick={addLink} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        <span>Add Link</span>
                    </button>
                </div>
            </EditorCard>

            <EditorCard title="CTA Button">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Button Text" value={navbar.ctaText} onChange={(v) => updateField('ctaText', v)} />
                    <InputField label="Button URL" value={navbar.ctaUrl} onChange={(v) => updateField('ctaUrl', v)} />
                </div>
            </EditorCard>
        </div>
    );
}

/**
 * This component handles editing of hero section content.
 * Allows changing greeting, name, title, description, and social links.
 */
function HeroEditor({ content, setContent }: EditorProps) {
    const { hero } = content;

    // This function updates a specific hero field
    const updateField = (field: keyof typeof hero, value: string) => {
        setContent((prev) => ({
            ...prev,
            hero: { ...prev.hero, [field]: value },
        }));
    };

    // This function updates a social link
    const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
        setContent((prev) => {
            const socialLinks = [...prev.hero.socialLinks];
            socialLinks[index] = { ...socialLinks[index], [field]: value };
            return { ...prev, hero: { ...prev.hero, socialLinks } };
        });
    };

    // This function adds a new social link
    const addSocial = () => {
        setContent((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                socialLinks: [...prev.hero.socialLinks, { platform: 'New', url: '#', icon: 'link' }],
            },
        }));
    };

    // This function removes a social link by index
    const removeSocial = (index: number) => {
        setContent((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                socialLinks: prev.hero.socialLinks.filter((_, i) => i !== index),
            },
        }));
    };

    return (
        <div className="space-y-6">
            <EditorCard title="Basic Info">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Badge Text" value={hero.badgeText} onChange={(v) => updateField('badgeText', v)} />
                        <InputField label="Greeting" value={hero.greeting} onChange={(v) => updateField('greeting', v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Name" value={hero.name} onChange={(v) => updateField('name', v)} />
                        <InputField label="Title" value={hero.title} onChange={(v) => updateField('title', v)} />
                    </div>
                    <TextAreaField label="Description" value={hero.description} onChange={(v) => updateField('description', v)} />
                </div>
            </EditorCard>

            <EditorCard title="Profile">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Profile Image URL" value={hero.profileImageUrl} onChange={(v) => updateField('profileImageUrl', v)} />
                    <InputField label="Years Experience" value={hero.yearsExperience} onChange={(v) => updateField('yearsExperience', v)} />
                </div>
                <div className="mt-4">
                    <InputField label="Status Text" value={hero.statusText} onChange={(v) => updateField('statusText', v)} />
                </div>
            </EditorCard>

            <EditorCard title="Social Links">
                <div className="space-y-3">
                    {hero.socialLinks.map((social, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <InputField label="Platform" value={social.platform} onChange={(v) => updateSocial(index, 'platform', v)} className="flex-1" />
                            <InputField label="URL" value={social.url} onChange={(v) => updateSocial(index, 'url', v)} className="flex-1" />
                            <InputField label="Icon" value={social.icon} onChange={(v) => updateSocial(index, 'icon', v)} className="w-28" />
                            <button onClick={() => removeSocial(index)} className="mt-5 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button onClick={addSocial} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        <span>Add Social Link</span>
                    </button>
                </div>
            </EditorCard>
        </div>
    );
}

/**
 * This component handles editing of experiences section content.
 * Allows adding, editing, and removing professional and education entries.
 */
function ExperiencesEditor({ content, setContent }: EditorProps) {
    const [editingSection, setEditingSection] = useState<'professional' | 'education'>('professional');

    const currentData = editingSection === 'professional' ? content.professionalExperiences : content.earlierExperiences;
    const dataKey = editingSection === 'professional' ? 'professionalExperiences' : 'earlierExperiences';

    // This function updates the section title
    const updateTitle = (value: string) => {
        setContent((prev) => ({
            ...prev,
            [dataKey]: { ...prev[dataKey], title: value },
        }));
    };

    // This function updates an experience entry field
    const updateEntry = (index: number, field: keyof ExperienceEntry, value: string | string[]) => {
        setContent((prev) => {
            const entries = [...prev[dataKey].entries];
            entries[index] = { ...entries[index], [field]: value };
            return { ...prev, [dataKey]: { ...prev[dataKey], entries } };
        });
    };

    // This function adds a new experience entry
    const addEntry = () => {
        const newEntry: ExperienceEntry = {
            id: `exp-${Date.now()}`,
            company: 'New Company',
            role: 'New Role',
            period: '202X - Present',
            description: 'Description here...',
            achievements: [],
            technologies: [],
            type: editingSection,
        };
        setContent((prev) => ({
            ...prev,
            [dataKey]: { ...prev[dataKey], entries: [...prev[dataKey].entries, newEntry] },
        }));
    };

    // This function removes an experience entry by index
    const removeEntry = (index: number) => {
        setContent((prev) => ({
            ...prev,
            [dataKey]: {
                ...prev[dataKey],
                entries: prev[dataKey].entries.filter((_, i) => i !== index),
            },
        }));
    };

    return (
        <div className="space-y-6">
            {/* Section Toggle */}
            <div className="flex space-x-2">
                <button
                    onClick={() => setEditingSection('professional')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editingSection === 'professional'
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Professional
                </button>
                <button
                    onClick={() => setEditingSection('education')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editingSection === 'education'
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Education
                </button>
            </div>

            <EditorCard title="Section Title">
                <InputField label="Title" value={currentData.title} onChange={updateTitle} />
            </EditorCard>

            {currentData.entries.map((entry, index) => (
                <EditorCard key={entry.id} title={entry.role}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Company" value={entry.company} onChange={(v) => updateEntry(index, 'company', v)} />
                            <InputField label="Role" value={entry.role} onChange={(v) => updateEntry(index, 'role', v)} />
                        </div>
                        <InputField label="Period" value={entry.period} onChange={(v) => updateEntry(index, 'period', v)} />
                        <TextAreaField label="Description" value={entry.description} onChange={(v) => updateEntry(index, 'description', v)} />
                        <TextAreaField
                            label="Achievements (one per line)"
                            value={entry.achievements.join('\n')}
                            onChange={(v) => updateEntry(index, 'achievements', v.split('\n').filter(Boolean))}
                        />
                        <InputField
                            label="Technologies (comma-separated)"
                            value={entry.technologies.join(', ')}
                            onChange={(v) => updateEntry(index, 'technologies', v.split(',').map((s) => s.trim()).filter(Boolean))}
                        />
                        <button onClick={() => removeEntry(index)} className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm font-medium">
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Entry</span>
                        </button>
                    </div>
                </EditorCard>
            ))}

            <button onClick={addEntry} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 font-medium">
                <Plus className="w-5 h-5" />
                <span>Add Experience Entry</span>
            </button>
        </div>
    );
}

/**
 * This component handles editing of skills section content.
 * Allows adding, editing, and removing skill categories and individual skills.
 */
function SkillsEditor({ content, setContent }: EditorProps) {
    const { skills } = content;

    // This function updates the skills section description
    const updateSection = (field: 'title' | 'description', value: string) => {
        setContent((prev) => ({
            ...prev,
            skills: { ...prev.skills, [field]: value },
        }));
    };

    // This function updates a skill category title
    const updateCategoryTitle = (catIndex: number, value: string) => {
        setContent((prev) => {
            const categories = [...prev.skills.categories];
            categories[catIndex] = { ...categories[catIndex], title: value };
            return { ...prev, skills: { ...prev.skills, categories } };
        });
    };

    // This function updates a skill item within a category
    const updateSkill = (catIndex: number, skillIndex: number, field: keyof SkillItem, value: string) => {
        setContent((prev) => {
            const categories = [...prev.skills.categories];
            const skills = [...categories[catIndex].skills];
            skills[skillIndex] = { ...skills[skillIndex], [field]: value };
            categories[catIndex] = { ...categories[catIndex], skills };
            return { ...prev, skills: { ...prev.skills, categories } };
        });
    };

    // This function adds a new skill to a category
    const addSkill = (catIndex: number) => {
        setContent((prev) => {
            const categories = [...prev.skills.categories];
            categories[catIndex] = {
                ...categories[catIndex],
                skills: [...categories[catIndex].skills, { name: 'New Skill', subtitle: 'Description' }],
            };
            return { ...prev, skills: { ...prev.skills, categories } };
        });
    };

    // This function removes a skill from a category
    const removeSkill = (catIndex: number, skillIndex: number) => {
        setContent((prev) => {
            const categories = [...prev.skills.categories];
            categories[catIndex] = {
                ...categories[catIndex],
                skills: categories[catIndex].skills.filter((_, i) => i !== skillIndex),
            };
            return { ...prev, skills: { ...prev.skills, categories } };
        });
    };

    // This function adds a new skill category
    const addCategory = () => {
        setContent((prev) => ({
            ...prev,
            skills: {
                ...prev.skills,
                categories: [...prev.skills.categories, { title: 'New Category', skills: [] }],
            },
        }));
    };

    // This function removes a skill category
    const removeCategory = (catIndex: number) => {
        setContent((prev) => ({
            ...prev,
            skills: {
                ...prev.skills,
                categories: prev.skills.categories.filter((_, i) => i !== catIndex),
            },
        }));
    };

    return (
        <div className="space-y-6">
            <EditorCard title="Section Info">
                <div className="space-y-4">
                    <InputField label="Title" value={skills.title} onChange={(v) => updateSection('title', v)} />
                    <TextAreaField label="Description" value={skills.description} onChange={(v) => updateSection('description', v)} />
                </div>
            </EditorCard>

            {skills.categories.map((category, catIndex) => (
                <EditorCard key={catIndex} title={category.title}>
                    <div className="space-y-4">
                        <InputField label="Category Title" value={category.title} onChange={(v) => updateCategoryTitle(catIndex, v)} />

                        <div className="space-y-3">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center gap-3">
                                    <InputField label="Name" value={skill.name} onChange={(v) => updateSkill(catIndex, skillIndex, 'name', v)} className="flex-1" />
                                    <InputField label="Subtitle" value={skill.subtitle} onChange={(v) => updateSkill(catIndex, skillIndex, 'subtitle', v)} className="flex-1" />
                                    <button onClick={() => removeSkill(catIndex, skillIndex)} className="mt-5 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button onClick={() => addSkill(catIndex)} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 text-sm font-medium">
                                <Plus className="w-4 h-4" />
                                <span>Add Skill</span>
                            </button>
                        </div>

                        <button onClick={() => removeCategory(catIndex)} className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm font-medium mt-2">
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Category</span>
                        </button>
                    </div>
                </EditorCard>
            ))}

            <button onClick={addCategory} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 font-medium">
                <Plus className="w-5 h-5" />
                <span>Add Category</span>
            </button>
        </div>
    );
}

/**
 * This component handles editing of projects section content.
 */
function ProjectsEditor({ content, setContent }: EditorProps) {
    const { projects } = content;

    const updateSection = (field: 'title' | 'subtitle', value: string) => {
        setContent((prev) => ({
            ...prev,
            projects: { ...prev.projects, [field]: value },
        }));
    };

    const updateProject = (index: number, field: keyof ProjectItem, value: string | string[]) => {
        setContent((prev) => {
            const items = [...prev.projects.items];
            items[index] = { ...items[index], [field]: value };
            return { ...prev, projects: { ...prev.projects, items } };
        });
    };

    const addProject = () => {
        setContent((prev) => ({
            ...prev,
            projects: {
                ...prev.projects,
                items: [
                    ...prev.projects.items,
                    {
                        id: `proj-${Date.now()}`,
                        title: 'New Project',
                        description: 'Description here...',
                        imageUrl: '',
                        technologies: [],
                        projectUrl: '',
                        githubUrl: ''
                    },
                ],
            },
        }));
    };

    const removeProject = (index: number) => {
        setContent((prev) => ({
            ...prev,
            projects: {
                ...prev.projects,
                items: prev.projects.items.filter((_, i) => i !== index),
            },
        }));
    };

    return (
        <div className="space-y-6">
            <EditorCard title="Section Info">
                <div className="space-y-4">
                    <InputField label="Title" value={projects.title} onChange={(v) => updateSection('title', v)} />
                    <InputField label="Subtitle" value={projects.subtitle} onChange={(v) => updateSection('subtitle', v)} />
                </div>
            </EditorCard>

            {projects.items.map((project, index) => (
                <EditorCard key={project.id} title={project.title}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Project Title" value={project.title} onChange={(v) => updateProject(index, 'title', v)} />
                            <InputField label="Image URL" value={project.imageUrl} onChange={(v) => updateProject(index, 'imageUrl', v)} />
                        </div>
                        <TextAreaField label="Description" value={project.description} onChange={(v) => updateProject(index, 'description', v)} />
                        <InputField
                            label="Technologies (comma-separated)"
                            value={project.technologies.join(', ')}
                            onChange={(v) => updateProject(index, 'technologies', v.split(',').map((s) => s.trim()).filter(Boolean))}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Project URL (Optional)" value={project.projectUrl || ''} onChange={(v) => updateProject(index, 'projectUrl', v)} />
                            <InputField label="GitHub URL (Optional)" value={project.githubUrl || ''} onChange={(v) => updateProject(index, 'githubUrl', v)} />
                        </div>
                        <button onClick={() => removeProject(index)} className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm font-medium">
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Project</span>
                        </button>
                    </div>
                </EditorCard>
            ))}

            <button onClick={addProject} className="flex items-center space-x-2 text-teal-500 hover:text-teal-600 font-medium">
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
            </button>
        </div>
    );
}

/**
 * This component handles editing of CTA section content.
 */
function CTAEditor({ content, setContent }: EditorProps) {
    const { cta } = content;

    // This function updates a CTA field
    const updateField = (field: keyof typeof cta, value: string) => {
        setContent((prev) => ({
            ...prev,
            cta: { ...prev.cta, [field]: value },
        }));
    };

    return (
        <EditorCard title="Call to Action">
            <div className="space-y-4">
                <InputField label="Title" value={cta.title} onChange={(v) => updateField('title', v)} />
                <TextAreaField label="Description" value={cta.description} onChange={(v) => updateField('description', v)} />
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Button Text" value={cta.buttonText} onChange={(v) => updateField('buttonText', v)} />
                    <InputField label="Button URL" value={cta.buttonUrl} onChange={(v) => updateField('buttonUrl', v)} />
                </div>
            </div>
        </EditorCard>
    );
}

/**
 * This component handles editing of footer content.
 */
function FooterEditor({ content, setContent }: EditorProps) {
    const { footer } = content;

    // This function updates a footer field
    const updateField = (field: keyof typeof footer, value: string) => {
        setContent((prev) => ({
            ...prev,
            footer: { ...prev.footer, [field]: value },
        }));
    };

    return (
        <EditorCard title="Footer Content">
            <div className="space-y-4">
                <InputField label="Copyright Text" value={footer.copyright} onChange={(v) => updateField('copyright', v)} />
                <InputField label="Built With Text" value={footer.builtWith} onChange={(v) => updateField('builtWith', v)} />
            </div>
        </EditorCard>
    );
}

/**
 * This component handles Google Apps Script configuration.
 * Allows admins to set up the connection to Google Sheets backend.
 */
function GASSettings({ config, setConfig }: { config: GASConfig; setConfig: React.Dispatch<React.SetStateAction<GASConfig>> }) {
    return (
        <div className="space-y-6">
            <EditorCard title="Google Apps Script Configuration">
                <div className="space-y-4">
                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 text-sm text-teal-700 dark:text-teal-300">
                        <p className="font-medium mb-2">Setup Instructions:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                            <li>Create a new Google Sheet</li>
                            <li>Go to Extensions → Apps Script</li>
                            <li>Paste the provided GAS code (see below)</li>
                            <li>Deploy as Web App (Execute as: Me, Access: Anyone)</li>
                            <li>Copy the Web App URL and paste it below</li>
                        </ol>
                    </div>

                    <InputField
                        label="Web App URL"
                        value={config.scriptUrl}
                        onChange={(v) => setConfig((prev) => ({ ...prev, scriptUrl: v }))}
                    />
                    <InputField
                        label="Sheet ID (from URL)"
                        value={config.sheetId}
                        onChange={(v) => setConfig((prev) => ({ ...prev, sheetId: v }))}
                    />
                </div>
            </EditorCard>

            <EditorCard title="Google Apps Script Code">
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {`// Google Apps Script - Portfolio CMS Backend
// Deploy as Web App: Execute as Me, Access Anyone

const SHEET_NAME = 'Content';

function doGet() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ error: 'Sheet not found' }, 404);
    }
    
    const data = sheet.getRange('A1').getValue();
    if (!data) {
      return jsonResponse({});
    }
    
    return jsonResponse(JSON.parse(data));
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      ss.insertSheet(SHEET_NAME);
    }
    
    const targetSheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);
    
    if (body.action === 'login') {
      // Check credentials from Settings sheet
      const settingsSheet = SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName('Settings');
      if (settingsSheet) {
        const creds = settingsSheet.getRange('A2:B2').getValues();
        if (creds[0][0] === body.username 
            && creds[0][1] === body.password) {
          return jsonResponse({ success: true });
        }
      }
      // Default fallback credentials
      if (body.username === 'admin' 
          && body.password === 'admin123') {
        return jsonResponse({ success: true });
      }
      return jsonResponse({ success: false });
    }
    
    if (body.action === 'update') {
      targetSheet.getRange('A1')
        .setValue(JSON.stringify(body.data));
      return jsonResponse(body.data);
    }
    
    return jsonResponse({ error: 'Invalid action' }, 400);
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                    </pre>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Copy this code into your Google Apps Script editor, then deploy as a Web App.
                </p>
            </EditorCard>
        </div>
    );
}

// ===== REUSABLE UI COMPONENTS =====

/**
 * This component renders a styled editor card with title and content.
 * Following DRY principle, used across all section editors.
 */
function EditorCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                <Settings className="w-4 h-4 text-teal-500" />
                <span>{title}</span>
            </h3>
            {children}
        </div>
    );
}

/**
 * This component renders a styled text input field.
 */
function InputField({
    label,
    value,
    onChange,
    className = '',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
            />
        </div>
    );
}

/**
 * This component renders a styled textarea field.
 */
function TextAreaField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm resize-y"
            />
        </div>
    );
}
